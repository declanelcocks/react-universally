import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { switchProp, prop } from 'styled-tools'

import Icon from '../Icon'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.div`
  font-size: ${switchProp(prop('size'), {
    small: '0.8125rem', // 13px
    medium: '1.5rem',
  })};
  line-height: ${switchProp(prop('size'), {
    small: '0.8125rem', // 13px
    medium: '1.5rem',
  })};
  margin-left: ${switchProp(prop('size'), {
    small: '0.25rem',
    medium: '0.5rem',
  })};
  margin-top: 2px;
  color: ${palette('secondary', 3)};
`

function Logo({ withText, size }) {
  return (
    <Wrapper>
      <Icon icon="logo" height={size === 'small' ? '1.5' : '3'} />

      {withText && <Text size={size}>Kyber One</Text>}
    </Wrapper>
  )
}

Logo.defaultProps = {
  size: 'small',
}

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  withText: PropTypes.bool,
}

export default Logo
