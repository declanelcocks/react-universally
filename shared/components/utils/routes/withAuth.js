import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'

import { selectUser } from '../../../redux/authentication/selectors'

const withAuth = Component => {
  const AuthComponent = props => {
    if (props.authenticated) {
      // Example of how to handle a second authentication step
      // if (props.user.role === 'something') {
      //   return (
      //     <Redirect
      //       to={{ pathname: '/signup/2', state: { from: props.location } }}
      //     />
      //   )
      // }

      // Return the requested route
      return <Component {...props} />
    }

    // Send unauthenticated users to `/signup`
    return (
      <Redirect to={{ pathname: '/signup', state: { from: props.location } }} />
    )
  }

  AuthComponent.propTypes = {
    location: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }

  return compose(
    withRouter,
    connect(state => ({
      authenticated: state.authentication.authenticated,
      user: selectUser(state.authentication),
    })),
  )(AuthComponent)
}

export default withAuth
