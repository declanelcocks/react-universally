import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import apiService from '../services/api'
import reducer from './reducers'
import reducerRegistry from './reducerRegistry'

function configureStore(initialState = {}) {
  const enhancers = compose(
    // Middleware store enhancer.
    applyMiddleware(
      // Initialising redux-thunk with extra arguments will pass the below
      // arguments to all the redux-thunk actions. Below we are passing a
      // preconfigured api instance which can be used to fetch data with.
      // @see https://github.com/gaearon/redux-thunk
      thunk.withExtraArgument({ api: apiService.create() }),
    ),
    // Redux Dev Tools store enhancer.
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    // We only want this enhancer enabled for development and when in a browser
    // with the extension installed.
    process.env.NODE_ENV === 'development' &&
    typeof window !== 'undefined' &&
    typeof window.devToolsExtension !== 'undefined'
      ? // Call the brower extension function to create the enhancer.
        window.devToolsExtension()
      : // Else we return a no-op function.
        f => f,
  )

  const combine = reducers => {
    const reducerNames = Object.keys(reducers)
    Object.keys(initialState).forEach(item => {
      if (reducerNames.indexOf(item) === -1) {
        reducers[item] = (state = null) => state
      }
    })
    return combineReducers(reducers)
  }

  const store = createStore(
    combine(reducerRegistry.getReducers()),
    initialState,
    enhancers,
  )

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combine(reducers))
  })

  if (process.env.NODE_ENV === 'development' && module.hot) {
    if (typeof window !== 'undefined')
      // Enable Webpack hot module replacement for reducers. This is so that we
      // don't lose all of our current application state during hot reloading.
      module.hot.accept('./reducers', async () => {
        await require('./reducers').default
        store.replaceReducer(combine(reducerRegistry.getReducers()))
      })
  }

  return store
}

export default configureStore
