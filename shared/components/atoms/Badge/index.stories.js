import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import Badge from '.'
import Icon from '../Icon'

const Div = styled.div`
  display: block;
  margin-bottom: 1.5rem;
`

storiesOf('Badge', module)
  .add('default', () => (
    <div>
      <Div>
        <Badge size="small">Hello</Badge>
      </Div>
      <Div>
        <Badge>Hello</Badge>
      </Div>
      <Div>
        <Badge size="large">Hello</Badge>
      </Div>
    </div>
  ))
  .add('circle badge', () => (
    <div>
      <Div>
        <Badge size="small">1</Badge>
      </Div>
      <Div>
        <Badge>1</Badge>
      </Div>
      <Div>
        <Badge size="large">1</Badge>
      </Div>
    </div>
  ))
  .add('with icon', () => (
    <div>
      <Div>
        <Badge size="small">
          <Icon icon="info" />
        </Badge>
      </Div>
      <Div>
        <Badge>
          <Icon icon="info" />
        </Badge>
      </Div>
      <Div>
        <Badge size="large">
          <Icon icon="info" />
        </Badge>
      </Div>
    </div>
  ))
