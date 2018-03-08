import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { compose, withState } from 'recompose'

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

const renderInput = ({ isDirty, setIsDirty, ...props }, invalid) => {
  const { type, input } = props

  switch (type) {
    case 'select': {
      return (
        <Select
          invalid={invalid}
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          {...props}
        />
      )
    }
    case 'multi-select': {
      return (
        <Select
          invalid={invalid}
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          {...props}
        />
      )
    }
    default: {
      return <Input invalid={invalid} {...input} {...props} />
    }
  }
}

const Field = props => {
  const { type, label, input, meta, isDirty } = props
  const renderInputFirst = type === 'checkbox' || type === 'radio'

  let invalid = meta.touched && !!meta.error
  // react-select does not set `meta.touched` to `true` after selecting an option
  // instead, it does set `meta.active` to `true` after choosing an option
  // it never sets this back to `false`, so we'll treat it as react-select's
  // `touched` value
  if (type === 'select' || type === 'multi-select') {
    invalid = !!meta.error
  }

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

      {!renderInputFirst && renderInput(props, invalid)}

      <Error id={`${input.name}Error`} role="alert" palette="danger">
        {type === 'select' || type === 'multi-select'
          ? invalid && meta.error && isDirty && <span>{meta.error}</span>
          : invalid && meta.error && <span>{meta.error}</span>}
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
  // Used by select/multi-select to manually set dirty after a
  // blur event. `react-select` doesn't handle it well enough to
  // handle showing our error messages and setting the invalid state
  isDirty: PropTypes.bool,
  setIsDirty: PropTypes.func,
}

Field.defaultProps = {
  type: 'text',
}

export default compose(withState('isDirty', 'setIsDirty', false))(Field)
