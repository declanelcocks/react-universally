import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const styles = css`
  display: block;
  width: 100%;
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
  )};
  padding: ${ifProp({ type: 'textarea' }, '0.5rem', '0 0.5rem')};
  box-sizing: border-box;
  color: ${ifProp(
    'disabled',
    palette('grayscale', 3),
    palette('grayscale', 0),
  )};
  background-color: ${ifProp(
    'disabled',
    palette('grayscale', 5),
    palette('grayscale', 0, true),
  )};
  border-radius: 0.25rem;
  border: 0.0625rem solid
    ${ifProp('invalid', palette('danger', 3), palette('grayscale', 4))};
  outline: none;
  ${ifProp(
    'disabled',
    css`
      cursor: default;
    `,
  )};

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
    color: ${ifProp(
      'disabled',
      palette('grayscale', 3),
      palette('grayscale', 4),
    )};
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
