/* eslint-disable react/no-array-index-key */
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import theme from '../theme'
import P from '../atoms/P'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`

const Color = styled.div`
  position: relative;
  height: 4.5rem;
  width: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${font('primary')};
  color: ${({ palette: paletteProp, num }) => {
    if (
      paletteProp === 'white' ||
      (paletteProp === 'grayscale' &&
        num > theme.palette[paletteProp].length / 2 - 1) ||
      num === theme.palette[paletteProp].length - 1
    )
      return palette('grayscale', 2)
    return palette('grayscale', 0, true)
  }};
  background-color: ${({ num }) => palette(num)};
`

storiesOf('Palette', module).add('default', () => (
  <div>
    {Object.keys(theme.palette).map(key => (
      <div key={key}>
        <P>{key}</P>
        <Wrapper>
          {theme.palette[key].map((v, i) => (
            <Color key={i} palette={key} num={i}>{`${v}`}</Color>
          ))}
        </Wrapper>
      </div>
    ))}
  </div>
))
