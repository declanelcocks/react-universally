import React from 'react'
import styled from 'styled-components'

import Icon from '../../atoms/Icon'
import Link from '../../atoms/Link'
import Logo from '../../atoms/Logo'

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Menu() {
  return (
    <MenuWrapper>
      <StyledLink to="/">
        <Logo size="small" withText />
      </StyledLink>

      <StyledLink to="/cart">
        <Icon icon="cart" palette="secondary" />
      </StyledLink>
    </MenuWrapper>
  )
}

export default Menu
