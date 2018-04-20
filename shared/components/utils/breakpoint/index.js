import { css } from 'styled-components'
import { size } from 'styled-theme'

// Expects styles to be passed in using css`` from styled-components
const breakpoint = (device, styles) => css`
  @media (min-width: ${size(device)}) {
    ${styles};
  }
`

export default breakpoint
