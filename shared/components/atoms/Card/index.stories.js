import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import Card from '.'

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  background: ${palette('white', 1)};
  padding: 2rem;
`

storiesOf('Card', module).add('default', () => (
  <Wrapper>
    <Card>Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.</Card>
  </Wrapper>
))
