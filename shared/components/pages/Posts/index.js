import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const AsyncPostsRoute = ({ route }) => (
  <div>
    <ul>
      <li>
        <Link to="/posts/1">Post 1</Link>
      </li>
      <li>
        <Link to="/posts/2">Post 2</Link>
      </li>
    </ul>

    <hr />

    {renderRoutes(route.routes)}
  </div>
)

AsyncPostsRoute.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }),
}

export default AsyncPostsRoute
