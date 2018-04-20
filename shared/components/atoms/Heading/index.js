import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { switchProp, prop } from 'styled-tools'

// Font size: 16px
// Line height: 1.5 (24px)
// Scale factor: 1.5 (2:3 Perfect fifth)

const styles = css`
  font-family: ${font('primary')};
  color: ${palette('secondary', 3)};
  font-weight: 400;
  font-size: ${switchProp(prop('level'), {
    1: '3.375rem',
    2: '2.25rem',
    3: '1.5rem',
    4: '1rem',
  })};
  line-height: ${switchProp(prop('level'), {
    1: '4.5rem',
    2: '3rem',
    3: '3rem',
    4: '1.5rem',
  })};
  margin-top: 1.5rem;
  margin-bottom: ${switchProp(prop('level'), {
    1: '3rem',
    2: '1.5rem',
    3: '0',
    4: '0',
  })};
`

const Heading = styled(
  ({ level, children, reverse, palette, theme, ...props }) =>
    React.createElement(`h${level}`, props, children),
)`
  ${styles};
`

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  reverse: PropTypes.bool,
}

Heading.defaultProps = {
  level: 1,
}

export default Heading
