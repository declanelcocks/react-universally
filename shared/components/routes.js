import AboutRoute from './pages/AsyncAboutRoute'
import CounterRoute from './pages/AsyncCounterRoute'
import HomeRoute from './pages/AsyncHomeRoute'
import PostsRoute from './pages/AsyncPostsRoute'
import PostRoute from './pages/AsyncPostsRoute/Post'
import Error404 from './pages/Error404'

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeRoute,
  },
  {
    path: '/about',
    component: AboutRoute,
  },
  {
    path: '/counter',
    component: CounterRoute,
  },
  {
    path: '/posts',
    component: PostsRoute,
    routes: [
      {
        path: '/posts/:id',
        component: PostRoute,
      },
    ],
  },
  {
    path: '*',
    component: Error404,
  },
]

export default routes
