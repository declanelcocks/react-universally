import generateAsyncRoute from './generateAsyncRoute'

export default function convertCustomRouteConfig(
  customRouteConfig,
  parentRoute,
) {
  return customRouteConfig.map(route => {
    if (typeof route.path === 'function') {
      const pathResult = route.path(parentRoute || '').replace('//', '/')
      return {
        path: pathResult,
        component: route.component,
        exact: route.exact,
        routes: route.routes
          ? convertCustomRouteConfig(route.routes, pathResult)
          : [],
      }
    }
    const pathResult = `${parentRoute || ''}${route.path}`
    return {
      path: pathResult,
      defaultPath: route.defaultPath,
      component:
        route.component ||
        generateAsyncRoute({ loader: () => import('./componentLessRoute') }),
      exact: route.exact,
      routes: route.routes
        ? convertCustomRouteConfig(route.routes, pathResult)
        : [],
    }
  })
}
