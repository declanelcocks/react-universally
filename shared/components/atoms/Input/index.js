import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const styles = css`
  display: block;
  font-family: ${font('primary')};
  font-size: 1rem;
  /* height */
  ${ifProp(
    { type: 'textarea' },
    css`
      height: auto;
    `,
    css`
      height: calc(2.625rem - 0.0625rem);
    `,
  )};
  ${ifProp(
    { type: 'textarea' },
    css`
      min-height: 6rem;
    `,
  )} margin-bottom: 1rem;
  padding: ${ifProp({ type: 'textarea' }, '0.5rem', '0 0.5rem')};
  box-sizing: border-box;
  color: ${palette('grayscale', 0)};
  background-color: ${palette('grayscale', 0, true)};
  border: 0.0625rem solid
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
