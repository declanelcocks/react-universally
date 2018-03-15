import styled from 'styled-components'
import { palette } from 'styled-theme'

const Card = styled.div`
  padding: 1.5rem;
  background: ${palette('white', 0)};
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  border-radius: 0.125rem;
`

export default Card
