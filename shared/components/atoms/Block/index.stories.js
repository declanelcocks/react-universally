import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Block from '.'

const StyledBlock = styled(Block)`
  height: 100px;
  width: 100px;
`

storiesOf('Block', module)
  .add('default', () => (
    <StyledBlock>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </StyledBlock>
  ))
  .add('inline', () => (
    <div>
      <StyledBlock inline>My first StyledBlock.</StyledBlock>
      <StyledBlock inline>My second StyledBlock.</StyledBlock>
    </div>
  ))
  .add('primary palette', () => (
    <StyledBlock palette="primary">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </StyledBlock>
  ))
  .add('secondary palette', () => (
    <StyledBlock palette="secondary">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </StyledBlock>
  ))
  .add('accent palette', () => (
    <StyledBlock palette="accent">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </StyledBlock>
  ))
