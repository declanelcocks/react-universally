import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const Wrapper = styled.span`
  display: inline-block;
  color: ${ifProp('palette', palette({ grayscale: 0 }, 3), 'currentcolor')};
  width: 1.25rem;
  height: 1.25rem;
  margin: 0.125rem;

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
    stroke: currentcolor;
  }
`

const Icon = ({ icon, ...props }) => {
  const svg = require(`!raw-loader!./icons/${icon}.svg`)
  return <Wrapper {...props} dangerouslySetInnerHTML={{ __html: svg }} />
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

export default Icon
