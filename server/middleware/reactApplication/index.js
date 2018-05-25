import React from 'react'
import Helmet from 'react-helmet'
import {
  renderToString,
  renderToStaticMarkup,
  renderToNodeStream,
} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import cookie from 'cookie'

import configureStore from '../../../shared/redux/configureStore'
import config from '../../../config'
import routes from '../../../shared/components/routes'
import { ensureReady } from '../../../shared/components/utils/routes'
import App from '../../../shared/components/App'
import theme from '../../../shared/components/theme'
import { log } from '../../../shared/utils/logging'
import ServerHTML from './ServerHTML'

/**
 * React application middleware, supports server side rendering.
 */
export default function reactApplicationMiddleware(request, response) {
  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response')
  }
  const {
    locals: { nonce },
  } = response

  const sheet = new ServerStyleSheet()

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      log({
        level: 'info',
        message: `Handling react route without SSR: ${request.url}`,
      })
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(
      sheet.collectStyles(<ServerHTML nonce={nonce} />),
    )
    response.status(200).send(`<!DOCTYPE html>${html}`)
    return
  }

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {}

  // Create the redux store.
  let token
  if (request.headers.cookie) {
    const { token: _token } = cookie.parse(request.headers.cookie)
    token = _token
  }
  const store = configureStore({}, token)

  ensureReady(routes, request, store).then(() => {
    const app = (
      <StaticRouter location={request.url} context={reactRouterContext}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </StaticRouter>
    )

    const appString = renderToString(sheet.collectStyles(app))
    const styleElement = sheet.getStyleElement()
    // Generate the html response.
    const html = renderToNodeStream(
      <ServerHTML
        reactAppString={appString}
        styleElement={styleElement}
        nonce={nonce}
        helmet={Helmet.rewind()}
        storeState={store.getState()}
        routerState={reactRouterContext}
      />,
    )

    switch (reactRouterContext.status) {
      case 301:
      case 302:
        // Check if the router context contains a redirect, if so we need to set
        // the specific status and redirect header and end the response.
        response.status(reactRouterContext.status)
        response.location(reactRouterContext.url)
        response.end()
        break
      case 404:
        // If the renderResult contains a "missed" match then we set a 404 code.
        // Our App component will handle the rendering of an Error404 view.
        response.status(reactRouterContext.status)
        response.type('html')
        response.write('<!doctype html>')
        html.pipe(response)
        break
      default:
        // Otherwise everything is all good and we send a 200 OK status.
        response.status(200)
        response.type('html')
        response.setHeader('Cache-Control', 'no-cache')
        response.write('<!doctype html>')
        html.pipe(response)
    }
  })
}
