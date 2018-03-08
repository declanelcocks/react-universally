import React from 'react'
import styled from 'styled-components'

import Heading from '../../atoms/Heading'
import Menu from '../../molecules/Menu'

const HeaderWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 1rem;
  text-align: center;
  color: #5499c7;
`

function Header() {
  return (
    <HeaderWrapper>
      <Heading level={1}>React, Universally</Heading>
      <strong>A starter kit for universal react applications.</strong>
      <Menu />
    </HeaderWrapper>
  )
}

export default Header
