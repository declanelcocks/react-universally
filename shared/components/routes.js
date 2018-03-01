import { generateAsyncRoute, convertCustomRouteConfig } from './utils/routes'

const postRoute = {
  path: parentPath => `${parentPath}/:id`,
  component: generateAsyncRoute({
    loader: async () => {
      await import(/* webpackChunkName: "post" */ '../redux/posts/reducer')
      return import(/* webpackChunkName: "post" */ './pages/Post')
    },
  }),
}

const routes = [
  {
    path: '/',
    exact: true,
    component: generateAsyncRoute({
      loader: () => import(/* webpackChunkName: "home" */ './pages/Home'),
    }),
  },
  {
    path: '/about',
    component: generateAsyncRoute({
      loader: () => import(/* webpackChunkName: "about" */ './pages/About'),
    }),
  },
  {
    path: '/counter',
    component: generateAsyncRoute({
      loader: () => import(/* webpackChunkName: "counter" */ './pages/Counter'),
    }),
  },
  {
    path: '/posts',
    component: generateAsyncRoute({
      loader: () => import(/* webpackChunkName: "posts" */ './pages/Posts'),
    }),
    routes: [postRoute],
  },
  {
    path: '*',
    component: generateAsyncRoute({
      loader: () => import(/* webpackChunkName: "404" */ './pages/NotFound'),
    }),
  },
]

export default convertCustomRouteConfig(routes)
