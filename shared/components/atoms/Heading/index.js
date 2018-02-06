import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { switchProp, prop } from 'styled-tools'

const styles = css`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
  font-weight: 400;
  font-size: ${switchProp(prop('level'), {
    1: '2.8125rem',
    2: '2rem',
    3: '1.4375rem',
    4: '1rem',
  })};
  line-height: ${switchProp(prop('level'), {
    1: '3.5rem',
    2: '3.5rem',
    3: '1.75rem',
    4: '1.75rem',
  })};
  margin-top: 1.75rem;
  margin-bottom: ${switchProp(prop('level'), {
    1: '3.5rem',
    2: '1.75rem',
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
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Heading.defaultProps = {
  level: 1,
  palette: 'grayscale',
}

export default Heading
