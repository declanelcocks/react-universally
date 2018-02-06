import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const P = styled.p`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  margin-top: 0rem;
  margin-bottom: 1.75rem;
`

P.propTypes = {
  reverse: PropTypes.bool,
}

export default P
