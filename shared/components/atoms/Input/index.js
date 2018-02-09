import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const styles = css`
  font-family: ${font('primary')};
  display: inline-flex;
  margin: 0.875rem 0;
  box-sizing: border-box;
  font-size: 1rem;
  padding: ${ifProp(
    { type: 'textarea' },
    '0.4444444444em',
    '0 0.4444444444em',
  )};
  height: ${ifProp({ type: 'textarea' }, 'auto', '2.625rem')};
  color: ${palette('grayscale', 0)};
  background-color: ${palette('grayscale', 0, true)};
  border: 1px solid
    ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-flex;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
  }
`

const StyledTextarea = styled.textarea`
  ${styles};
`
const StyledSelect = styled.select`
  ${styles};
`
const StyledInput = styled.input`
  ${styles};
`

const Input = ({ ...props }) => {
  if (props.type === 'textarea') {
    return <StyledTextarea {...props} />
  } else if (props.type === 'select') {
    return <StyledSelect {...props} />
  }
  return <StyledInput {...props} />
}

Input.propTypes = {
  type: PropTypes.string,
  reverse: PropTypes.bool,
  invalid: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
}

export default Input
