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
    matches.map(({ route, match }) => {
      const { component } = route

      if (component && component.load) {
        return component.load().then(c => {
          if (typeof window !== 'undefined') return Promise.resolve(null)

          return c.loadData ? c.loadData(match, store) : Promise.resolve(null)
        })
      }

      return undefined
    }),
  )
}
