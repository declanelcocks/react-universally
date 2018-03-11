import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import Icon from '../../atoms/Icon'
import Link from '../../atoms/Link'
import Logo from '../../atoms/Logo'

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
`

const List = styled.ul`
  flex: 1;
  margin: 0.75rem 0;
  padding: 0 0.75rem;

  li {
    display: inline-flex;
    margin: 0;

    a {
      position: relative;
      padding: 0.75rem 0.5rem;

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: transparent;
        transition: all 0.1s ease;
      }

      &:focus,
      &:hover {
        &:before {
          background-color: ${palette('grayscale', 0)};
        }
      }
    }
  }
`

const LogoLink = styled(Link)`
  display: flex;
`

const MenuLink = props => <Link palette="grayscale" {...props} />

function Menu() {
  return (
    <MenuWrapper>
      <LogoLink to="/">
        <Logo size="small" />
      </LogoLink>

      <List>
        <li>
          <MenuLink to="/">Home</MenuLink>
        </li>
        <li>
          <MenuLink to="/counter">Counter</MenuLink>
        </li>
        <li>
          <MenuLink to="/posts">Posts</MenuLink>
        </li>
        <li>
          <MenuLink to="/about">About</MenuLink>
        </li>
      </List>

      <MenuLink to="/cart">
        <Icon icon="cart" />
      </MenuLink>
    </MenuWrapper>
  )
}

export default Menu
