import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

const StyledFlex = styled(Flex)`
  flex: 1;
`

const Row = ({ ...props }) => {
  return <StyledFlex flexWrap="wrap" {...props} />
}

export default Row
