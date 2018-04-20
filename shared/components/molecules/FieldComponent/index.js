import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { palette } from 'styled-theme'

import Block from '../../atoms/Block'
import Label from '../../atoms/Label'
import Input from '../../atoms/Input'
import Select from '../../atoms/Select'
import Icon from '../../atoms/Icon'

const Wrapper = styled.div`
  label {
    line-height: 1.5rem;
    font-size: 0.875rem; /* 14px */

    input[type='checkbox'],
    input[type='radio'] {
      margin-right: 0.5rem;
    }
  }
`

const Error = styled(Block)`
  font-size: 0.875rem; /* 14px */
  min-height: 1.5rem;
`
const WithIconFieldWrapper = styled.div`
  display: flex;
  background-color: ${palette('white', 0)};
  align-items: center;
`

const FieldIcon = styled(Icon)`
  position: absolute;
  left: 0.5rem;
  color: ${palette('grayscale', 3)};
`
const WithIconFieldInput = styled(Input)`
  width: 100%;
  padding-left: 2.5rem;
`

const renderInput = (props, invalid) => {
  const { type, input } = props

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

const renderInputWithIcon = ({ ...props }, invalid, icon) => {
  // eslint-disable-next-line react/prop-types
  const { input } = props

  return (
    <WithIconFieldWrapper>
      <FieldIcon icon={icon} />
      <WithIconFieldInput invalid={invalid} {...input} {...props} />
    </WithIconFieldWrapper>
  )
}

const FieldComponent = props => {
  const { type, label, input, meta, icon } = props
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

      {icon
        ? !renderInputFirst && renderInputWithIcon(props, invalid, icon)
        : !renderInputFirst && renderInput(props, invalid)}

      <Error id={`${input.name}Error`} role="alert" palette="red">
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

FieldComponent.propTypes = {
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
  icon: PropTypes.string,
}

FieldComponent.defaultProps = {
  type: 'text',
}

export default FieldComponent
