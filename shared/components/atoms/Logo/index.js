import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import logo from './logo.svg'

const Img = styled.img`
  padding: 0.25rem;
  ${ifProp(
    { size: 'small' },
    css`
      height: 3rem;
      width: 3.5rem;
    `,
    css`
      height: 6rem;
      width: 7rem;
    `,
  )};
`

function Logo(props) {
  return <Img src={logo} alt="Logo" {...props} />
}

Logo.defaultProps = {
  size: 'medium',
}

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
}

export default Logo
