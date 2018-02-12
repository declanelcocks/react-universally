import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import Label from '../../atoms/Label'
import Input from '../../atoms/Input'
import Block from '../../atoms/Block'

const Wrapper = styled.div`
  label {
    margin-bottom: 1rem;

    input[type='checkbox'],
    input[type='radio'] {
      margin-right: 0.5rem;
    }
  }
`

const Error = styled(Block)`
  font-size: 0.8125rem; /* 13px */
  min-height: 1.5rem;
`

const Field = ({ type, label, input, meta }) => {
  const renderInputFirst = type === 'checkbox' || type === 'radio'
  const invalid = meta.touched && !!meta.error

  return (
    <Wrapper>
      {renderInputFirst && <Input type={type} invalid={invalid} {...input} />}

      {label && (
        <Label
          htmlFor={input.id}
          className={classnames({ active: meta.active })}
        >
          {label}
        </Label>
      )}

      {renderInputFirst || <Input type={type} invalid={invalid} {...input} />}

      <Error id={`${input.name}Error`} role="alert" palette="danger">
        {invalid && meta.error && <span>{meta.error}</span>}
      </Error>
    </Wrapper>
  )
}

Field.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
}

Field.defaultProps = {
  type: 'text',
}

export default Field
