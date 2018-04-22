import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const fillStyle = css`
  .filled {
    fill: none;
    stroke: none;
  }
  ${ifProp(
    'filled',
    css`
      .filled {
        fill: currentcolor;
        stroke: currentcolor;
      }
      .unfilled {
        fill: none;
        stroke: none;
      }
    `,
  )};
`

const fillHover = css`
  ${ifProp(
    'filled',
    ifProp(
      'unfillOnHover',
      null,
      css`
        .filled {
          fill: ${({ hoverPalette }) =>
            palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
          stroke: ${({ hoverPalette }) =>
            palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
        }
      `,
    ),
  )};
`

const fillOnHover = css`
  ${ifProp(
    'fillOnHover',
    css`
      .filled {
        fill: ${({ hoverPalette }) =>
          palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
        stroke: ${({ hoverPalette }) =>
          palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
      }
      .unfilled {
        fill: none;
        stroke: none;
      }
    `,
  )};
`

const unfillOnHover = css`
  ${ifProp(
    'unfillOnHover',
    css`
      .filled {
        fill: none;
        stroke: none;
      }
      .unfilled {
        fill: ${({ hoverPalette }) =>
          palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
        stroke: ${({ hoverPalette }) =>
          palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
      }
    `,
  )};
`

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  color: ${ifProp(
    'palette',
    ifProp(
      { palette: 'white' },
      palette({ grayscale: 0 }, 0),
      palette({ grayscale: 0 }, 3),
    ),
    'currentcolor',
  )};
  height: ${({ height }) => `${height}rem`};
  width: ${({ height }) => `${height}rem`};

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: currentcolor;
    stroke: currentcolor;
    ${fillStyle};
  }

  ${ifProp(
    'hoverPalette',
    css`
      &:hover > svg {
        fill: ${({ hoverPalette }) =>
          palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
        stroke: ${({ hoverPalette }) =>
          palette(hoverPalette, hoverPalette === 'grayscale' ? 0 : 3)};
        ${unfillOnHover};
        ${fillOnHover};
        ${fillHover};
      }
    `,
  )};
`

const Icon = ({ icon, ...props }) => {
  const svg = require(`!raw-loader!./icons/${icon}.svg`)
  return <Wrapper {...props} dangerouslySetInnerHTML={{ __html: svg }} />
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  height: PropTypes.string,
  hoverPalette: PropTypes.string,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Icon.defaultProps = {
  height: '1.5',
}

export default Icon
