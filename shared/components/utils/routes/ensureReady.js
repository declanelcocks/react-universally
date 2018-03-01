import { matchRoutes } from 'react-router-config'

/**
 * First match the routes via react-router-config's `matchRoutes` function.
 * Then iterate over all of the matched routes, if they've got a load function
 * call it.
 *
 * This helps us to make sure all the async code is loaded before rendering.
 */
export default function ensureReady(routeConfig, url, store) {
  const matches = matchRoutes(routeConfig, url)

  return Promise.all(
    matches.map(({ route: { component }, match }) => {
      if (component && component.load) {
        return component.load().then(c => {
          // A component's `.load()` may include importing of redux related files.
          // `ensureReady` is ran on both client and server. On the server, we want
          // to use `component.loadData()` to pre-fetch any required data for that page.
          //
          // If `window` exists, we're on the client and don't care about pre-loading
          // any data.
          if (typeof window !== 'undefined') return Promise.resolve(null)

          return c.loadData ? c.loadData(match, store) : Promise.resolve(null)
        })
      }

      return undefined
    }),
  )
}
