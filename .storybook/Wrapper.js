import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import StoryRouter from 'storybook-router'
import styled, { ThemeProvider } from 'styled-components'

import '../shared/components/globalStyles'
import theme from '../shared/components/theme'

const Baseline = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 1px 1rem;
  background-repeat: repeat;
  background: linear-gradient(rgba(0, 119, 179, 0.4) 1px, transparent 1px) left
    top / 1.75rem 1.75rem;
  z-index: 9999;
  pointer-events: none;
`
const HalfBaseline = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: calc(1.75rem / 2);
  left: 0;
  background-size: 1px 1rem;
  background-repeat: repeat;
  background: linear-gradient(rgba(0, 119, 179, 0.15) 1px, transparent 1px) left
    top / 1.75rem 1.75rem;
  z-index: 9999;
  pointer-events: none;
`

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Baseline />
      <HalfBaseline />
      {children}
    </Fragment>
  </ThemeProvider>
)

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Wrapper
