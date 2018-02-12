import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Label = styled.label`
  font-family: ${font('primary')};
  color: ${({ palette: paletteName }) =>
    palette(paletteName, paletteName === 'grayscale' ? 3 : 1)};
  font-size: 0.8125rem; /* 13px */
  line-height: 1rem;
`

Label.propTypes = {
  reverse: PropTypes.bool,
  palette: PropTypes.string,
}

Label.defaultProps = {
  palette: 'grayscale',
}

export default Label
