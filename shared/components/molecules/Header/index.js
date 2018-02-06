import React from 'react'
import styled from 'styled-components'

import Logo from '../../atoms/Logo'
import Menu from '../../atoms/Menu'

const HeaderWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 1rem;
  text-align: center;
  color: #5499c7;
`

function Header() {
  return (
    <HeaderWrapper>
      <Logo />
      <h1>React, Universally</h1>
      <strong>A starter kit for universal react applications.</strong>
      <Menu />
    </HeaderWrapper>
  )
}

export default Header
