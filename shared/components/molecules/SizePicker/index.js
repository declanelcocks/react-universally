import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import Button from '../../atoms/Button'

const Wrapper = styled.div`
  display: inline-flex;

  > * {
    border-radius: 0rem;
    font-size: 0.8125rem;
    padding-left: 0rem;
    padding-right: 0rem;
    width: 2.5rem;
    height: 2rem;
  }

  > *:not(:last-child) {
    border-right-color: ${palette('primary', 3)};
  }
`

const SizeButton = styled(Button)`
  display: inline-block;
`

const SizePicker = ({ handleChooseSize }) => (
  <Wrapper>
    <SizeButton small onClick={() => handleChooseSize('xs')}>
      XS
    </SizeButton>
    <SizeButton small onClick={() => handleChooseSize('s')}>
      S
    </SizeButton>
    <SizeButton small onClick={() => handleChooseSize('m')}>
      M
    </SizeButton>
    <SizeButton small onClick={() => handleChooseSize('l')}>
      L
    </SizeButton>
    <SizeButton small onClick={() => handleChooseSize('xl')}>
      XL
    </SizeButton>
    <SizeButton small onClick={() => handleChooseSize('xxl')}>
      XXL
    </SizeButton>
  </Wrapper>
)

SizePicker.propTypes = {
  handleChooseSize: PropTypes.func.isRequired,
}

export default SizePicker
