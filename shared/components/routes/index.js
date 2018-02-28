import generateAsyncRoute from './generateAsyncRoute'
import convertCustomRouteConfig from './convertCustomRouteConfig'

const postRoute = {
  path: parentPath => `${parentPath}/:id`,
  component: generateAsyncRoute({
    loader: async () => {
      await import(/* webpackChunkName: "post" */ '../../redux/posts/reducer')
      return import(/* webpackChunkName: "post" */ '../pages/AsyncPostsRoute/Post')
    },
  }),
}

const routes = [
  {
    path: '/',
    exact: true,
    component: generateAsyncRoute({
      loader: () =>
        import(/* webpackChunkName: "home" */ '../pages/AsyncHomeRoute'),
    }),
  },
  {
    path: '/about',
    component: generateAsyncRoute({
      loader: () =>
        import(/* webpackChunkName: "about" */ '../pages/AsyncAboutRoute'),
    }),
  },
  {
    path: '/counter',
    component: generateAsyncRoute({
      loader: () =>
        import(/* webpackChunkName: "counter" */ '../pages/AsyncCounterRoute'),
    }),
  },
  {
    path: '/posts',
    component: generateAsyncRoute({
      loader: () =>
        import(/* webpackChunkName: "posts" */ '../pages/AsyncPostsRoute'),
    }),
    routes: [postRoute],
  },
  {
    path: '*',
    component: generateAsyncRoute({
      loader: () => import(/* webpackChunkName: "404" */ '../pages/Error404'),
    }),
  },
]

export default convertCustomRouteConfig(routes)
