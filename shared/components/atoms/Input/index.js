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
      height: calc(2.625rem - 0.125rem);
    `,
  )};
  ${ifProp(
    { type: 'textarea' },
    css`
      min-height: 6rem;
    `,
  )} padding: ${ifProp({ type: 'textarea' }, '0.5rem', '0 0.5rem')};
  box-sizing: border-box;
  color: ${palette('grayscale', 0)};
  background-color: ${palette('grayscale', 0, true)};
  border: 0.0625rem solid
    ${ifProp('invalid', palette('danger', 3), palette('grayscale', 4))};
  border-radius: 2px;
  outline: none;

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.5rem 0 0;
  }

  &::placeholder {
    color: ${palette('grayscale', 4)};
  }
`

const StyledTextarea = styled.textarea`
  ${styles};
`
const StyledInput = styled.input`
  ${styles};
`

const Input = ({ ...props }) => {
  if (props.type === 'textarea') return <StyledTextarea {...props} />
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
