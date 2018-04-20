import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { ifProp, switchProp } from 'styled-tools'

const Block = styled.div`
  font-family: ${font('primary')};
  background-color: ${switchProp('palette', {
    white: palette(0),
    primary: palette(3),
    secondary: palette(3),
    accent: palette(3),
  })};
  color: ${switchProp('palette', {
    white: palette('grayscale', 1),
    primary: palette('white', 0),
    secondary: palette('white', 0),
    accent: palette('secondary', 3),
  })};
  ${ifProp(
    'inline',
    css`
      display: inline-flex;
    `,
  )};
`

Block.propTypes = {
  palette: PropTypes.string,
}

Block.defaultProps = {
  palette: 'transparent',
}

export default Block
