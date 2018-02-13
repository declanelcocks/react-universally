import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import Block from '../../atoms/Block'
import Label from '../../atoms/Label'
import Input from '../../atoms/Input'
import Select from '../../atoms/Select'

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

const renderInput = props => {
  const { type, input, meta } = props
  const invalid = meta.touched && !!meta.error

  switch (type) {
    case 'select': {
      return <Select invalid={invalid} {...props} />
    }
    case 'multi-select': {
      return <Select invalid={invalid} {...props} />
    }
    default: {
      return <Input invalid={invalid} {...input} {...props} />
    }
  }
}

const Field = props => {
  const { type, label, input, meta } = props
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

      {!renderInputFirst && renderInput(props)}

      <Error id={`${input.name}Error`} role="alert" palette="danger">
        {invalid && meta.error && <span>{meta.error}</span>}
      </Error>
    </Wrapper>
  )
}

const conditionPropType = (condition, passType, failType) => (
  props,
  propName,
  componentName,
) => {
  const propTypes = {
    [propName]: condition(props) ? passType : failType,
  }

  return PropTypes.checkPropTypes(propTypes, props, 'prop', componentName)
}

Field.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
  options: conditionPropType(
    props => props.type === 'select',
    PropTypes.array.isRequired,
    PropTypes.array,
  ),
}

Field.defaultProps = {
  type: 'text',
}

export default Field
