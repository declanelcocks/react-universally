import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp, prop } from 'styled-tools'

import Icon from '../../atoms/Icon'
import Button from '../../atoms/Button'

const StyledButton = styled(Button)`
  max-width: 100%;
  width: ${ifProp('hasText', 'auto', '2.5rem')};
  min-height: 2.5rem;
  padding: ${ifProp('hasText', '0 0.4375rem', 0)};
  box-sizing: border-box;

  ${ifProp(
    'responsive',
    css`
      @media screen and (max-width: ${prop('breakpoint')}px) {
        width: auto;
      }
    `,
  )};
`

const Text = styled.span`
  padding: 0.4375rem;

  @media screen and (max-width: ${prop('breakpoint')}px) {
    display: ${ifProp('responsive', 'none !important')};
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const StyledIcon = styled(Icon)`
  flex: none;
`

const IconButton = ({ icon, children, ...props }) => {
  const { breakpoint, right, responsive } = props
  const iconElement = <StyledIcon icon={icon} />

  return (
    <StyledButton hasText={!!children} {...props}>
      <Wrapper>
        {right || iconElement}
        {children && (
          <Text
            className="text"
            responsive={responsive}
            breakpoint={breakpoint}
          >
            {children}
          </Text>
        )}
        {right && iconElement}
      </Wrapper>
    </StyledButton>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  responsive: PropTypes.bool,
  breakpoint: PropTypes.number,
  right: PropTypes.bool,
  children: PropTypes.node,
}

IconButton.defaultProps = {
  breakpoint: 420,
}

export default IconButton
