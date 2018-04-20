import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import Icon from '../Icon'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledIcon = styled(Icon)`
  width: 100%;
  height: 100%;
`

function Logo(props) {
  return (
    <Wrapper {...props}>
      <StyledIcon icon="logo" />
    </Wrapper>
  )
}

Logo.defaultProps = {
  size: 'medium',
}

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
}

export default Logo
