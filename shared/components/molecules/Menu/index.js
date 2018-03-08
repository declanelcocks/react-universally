import React from 'react'
import styled from 'styled-components'

import Logo from '../../atoms/Logo'
import Link from '../../atoms/Link'

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
`

const List = styled.ul`
  flex: 1;
  margin: 0.75rem 0;
  padding: 0.75rem;

  li {
    display: inline-flex;
  }
`

const LogoLink = styled(Link)`
  display: flex;
`

function Menu() {
  return (
    <MenuWrapper>
      <LogoLink to="/">
        <Logo size="small" />
      </LogoLink>

      <List>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </List>
    </MenuWrapper>
  )
}

export default Menu
