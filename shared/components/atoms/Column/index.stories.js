import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import Column from '.'
import Row from '../Row'

// just to indicate the Columns
const CustomColumn = styled(Column)`
  background: ${palette('primary', 4)};
  color: ${palette('white', 0)};
  text-align: center;
  border: 0.1rem ${palette('secondary', 1)} solid;
`

storiesOf('Column', module)
  .add('default', () => (
    <Row>
      <CustomColumn>Default</CustomColumn>
      <CustomColumn>Default</CustomColumn>
    </Row>
  ))
  .add('columns', () => (
    <div>
      <Row>
        <CustomColumn>12</CustomColumn>
      </Row>
      <Row>
        <CustomColumn columns="11">11</CustomColumn>
        <CustomColumn columns="1">1</CustomColumn>
      </Row>
      <Row>
        <CustomColumn columns="10">10</CustomColumn>
        <CustomColumn columns="2">2</CustomColumn>
      </Row>
      <Row>
        <CustomColumn columns="9">9</CustomColumn>
        <CustomColumn columns="3">3</CustomColumn>
      </Row>
      <Row>
        <CustomColumn columns="8">8</CustomColumn>
        <CustomColumn columns="4">4</CustomColumn>
      </Row>
      <Row>
        <CustomColumn columns="7">7</CustomColumn>
        <CustomColumn columns="5">5</CustomColumn>
      </Row>
      <Row>
        <CustomColumn columns="6">6</CustomColumn>
        <CustomColumn columns="6">6</CustomColumn>
      </Row>
    </div>
  ))
  .add('responsive columns', () => (
    <Row flexWrap="wrap">
      <CustomColumn columns="12 6 3">3</CustomColumn>
      <CustomColumn columns="12 6 9">9</CustomColumn>
    </Row>
  ))
