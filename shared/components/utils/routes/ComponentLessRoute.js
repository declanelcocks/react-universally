import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
)

const ComponentLessRoute = ({ route, location }) => {
  const shouldRedirect =
    route.routes.findIndex(r => r.path === location.pathname) === -1
  const redirectIndex = route.routes.findIndex(
    r => r.path === route.defaultPath,
  )

  if (shouldRedirect) {
    const redirectRoute =
      redirectIndex > -1 ? route.routes[redirectIndex] : route.routes[0]
    return <Redirect to={redirectRoute.path} />
  }

  return (
    <React.Fragment>
      {// eslint-disable-next-line react/no-array-index-key
      route.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </React.Fragment>
  )
}

ComponentLessRoute.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}

export default ComponentLessRoute
