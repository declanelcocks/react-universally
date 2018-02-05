import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import StoryRouter from 'storybook-router'

import '../shared/components/globalStyles'

const Wrapper = ({ children }) => <Fragment>{children}</Fragment>

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Wrapper
