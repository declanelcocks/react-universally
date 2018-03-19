import uuid from 'uuid'
import hpp from 'hpp'
import helmet from 'helmet'
import config from '../../config'

/*
 * Content Security Policy (CSP)
 *
 * - Cross-Site Scripting (XSS)
 *    Malicious JS is put on the page, which can steal sensitive data or perform
 *    malicious actions
 * - XSS Filter
 *    A unique kind of XSS where a script is placed into a URLs query parameters.
 *    This script will then be ran by the browser. @see https://helmetjs.github.io/docs/xss-filter/
 * - Clickjacking
 *    This is where your website will run inside an iframe in order to run on top of some secret
 *    content. This could mean that when you click a button, you're actually clicking something
 *    underneath the iframe. @see https://helmetjs.github.io/docs/frameguard/
 * - MIME Sniffing
 *    Some browsers will try to "guess" the content type of the files. If an image was uploaded with a
 *    .jpg extension, but its contents were actually HTML, then someone visiting that image could cause
 *    the browser to "run" the HTML, which could also contain malicious JavaScript.
 *    @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
 * - Put a tiny image on your site (tracking pixel)
 *    Puts a tiny image on your site to gain an idea of how much traffic your site gets
 * - Get a vulnerable plugin to run
 *    Exploit its flaws while on your website
 * -
 *
 * So, CSP?
 * A CSP will define exactly where your site can download different types of resources from.
 *
 * What if I want to include a `<script>` tag?
 * We can "sign" our scripts with a nonce tag which looks something like this:
 * `<script nonce="nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9">....</script>`
 * This security middleware will generate a nonce and attach it to `response`, passing it onto the
 * React middleware.
 */

// Default CSP config
const cspConfig = {
  directives: {
    childSrc: ["'self'"],
    // Note: Setting this to stricter than * breaks the service worker. :(
    connectSrc: ['*'], // ["'self'", 'ws:'],
    defaultSrc: ["'self'"],
    imgSrc: [
      "'self'",
      // If you use Base64 encoded images (i.e. inlined images), then you will
      // need `data:`,
    ],
    fontSrc: ["'self'", 'data:'],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    manifestSrc: ["'self'"],
    scriptSrc: [
      // Allow scripts hosted from our application.
      "'self'",
      // Note: We will execution of any inline scripts that have the following
      // nonce identifier attached to them.
      // This is useful for guarding your application whilst allowing an inline
      // script to do data store rehydration (redux/mobx/apollo) for example.
      // @see https://helmetjs.github.io/docs/csp/
      (req, res) => `'nonce-${res.locals.nonce}'`,
      // This is a know workaround for browsers that don't support nonces.
      // It will be ignored by browsers that do support nonces as they will
      // recognise that we have also provided a nonce configuration and
      // use the stricter rule.
      "'unsafe-inline'",
    ],
    styleSrc: [
      "'self'",
      // Webpack generates JS that loads our CSS, so this is needed:
      "'unsafe-inline'",
      'blob:',
    ],
  },
}

// Get our custom CSP config
const cspExtensions = config('cspExtensions')

// Combine our custom CSP config with the default CSP config above
Object.keys(cspExtensions).forEach(key => {
  if (cspConfig.directives[key]) {
    cspConfig.directives[key] = cspConfig.directives[key].concat(
      cspExtensions[key],
    )
  } else {
    cspConfig.directives[key] = cspExtensions[key]
  }
})

if (process.env.BUILD_FLAG_IS_DEV === 'true') {
  // In development mode, we have a client bundle server running that is used
  // to hos our bundle. Since that will be an "external" URL, we will also need
  // to allow our app to load resources from it.
  Object.keys(cspConfig.directives).forEach(directive => {
    cspConfig.directives[directive].push(
      `${config('host')}:${config('clientDevServerPort')}`,
    )
  })

  // When using dynamic imports (`import(...)`), webpack will inject the chunk using `eval()`.
  // Webpack is used to run our development server, so that's why it's only needed in our
  // development environment
  cspConfig.directives.scriptSrc.push("'unsafe-eval'")
}

// Attach a unique "nonce" to every response.  This allows use to declare
// inline scripts as being safe for execution against our content security policy.
// @see https://helmetjs.github.io/docs/csp/
function nonceMiddleware(req, res, next) {
  // eslint-disable-next-line no-param-reassign
  res.locals.nonce = uuid.v4()
  next()
}

const securityMiddleware = [
  nonceMiddleware,

  // Prevent HTTP Parameter pollution.
  // @see http://bit.ly/2f8q7Td
  // `hpp()` will sanitize the HTTP parameters to ensure they are of correct type
  // and catch any errors with the parameters without crashing the server
  hpp(),

  // Prevent XSS Filter attacks
  helmet.xssFilter(),

  // Prevent Clickjacking attacks
  helmet.frameguard('deny'),

  // Sets the X-Download-Options to prevent Internet Explorer from executing
  // downloads in your site’s context.
  // @see https://helmetjs.github.io/docs/ienoopen/
  helmet.ieNoOpen(),

  // Prevent MIME Sniffing attacks
  helmet.noSniff(),

  // If we are relying on resources from other servers, then we will have to
  // explicitly configure the CSP below to allow for this. For example, in our
  // config, we've added the `polyfill.io` CDN to allow us to use the polyfill
  // script.
  helmet.contentSecurityPolicy(cspConfig),
]

export default securityMiddleware
