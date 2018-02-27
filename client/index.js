/* eslint-disable global-require */

import React from 'react'
import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { AppContainer as ReactHotLoader } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import FontFaceObserver from 'fontfaceobserver'

import './polyfills'

import configureStore from '../shared/redux/configureStore'
import theme from '../shared/components/theme'
import App from '../shared/components/App'

// Observe loading of our custom font
const latoObserver = new FontFaceObserver('Lato', {})

// When our custom font has loaded, add a class to the body
latoObserver.load().then(
  () => {
    document.body.classList.add('fontloaded')
  },
  () => {
    document.body.classList.remove('fontloaded')
  },
)

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app')

// Create our Redux store.
const store = configureStore(
  // Server side rendering would have mounted our state on this global.
  window.__APP_STATE__, // eslint-disable-line no-underscore-dangle
)

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history

/**
 * Renders the given React Application component.
 */
function renderApp(App) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <Provider store={store}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ReactHotLoader>
  )

  hydrate(app, container)
}

// Execute the first render of our app.
renderApp(App)

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker')

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  module.hot.dispose(data => {
    // Deserialize store and keep in hot module data for next replacement
    data.store = stringify(toJS(store)) // eslint-disable-line
  })

  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js')
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('../shared/components/App', () => {
    renderApp(require('../shared/components/App').default)
  })
}
