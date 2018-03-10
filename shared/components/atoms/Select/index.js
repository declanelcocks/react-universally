import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import omit from 'lodash/omit'
import isArray from 'lodash/isArray'
import find from 'lodash/find'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

import Badge from '../Badge'

const StyledReactSelect = styled(ReactSelect)`
  .Select-control {
    box-shadow: none !important;
    border-radius: 2px;
    border: 0.0625rem solid
      ${ifProp(
        ['invalid', 'isDirty'],
        palette('danger', 3),
        palette('grayscale', 4),
      )} !important;
  }

  &.is-focused .Select-control,
  &.is-open .Select-control {
    border-color: ${ifProp(
      ['invalid', 'isDirty'],
      palette('danger', 3),
      palette('grayscale', 4),
    )} !important;
  }

  .Select-multi-value-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 0 0.5rem;

    > *:not(:last-child) {
      margin-right: 0.5rem;
    }

    .Select-input {
      height: 2.375rem;
      margin-left: 0;
      padding-left: 0;

      > input {
        line-height: 2.375rem;
        padding: 0;
      }
    }
  }

  .Select-placeholder {
    color: ${palette('grayscale', 4)};
    line-height: 2.375rem;
    padding: 0 0.5rem;
  }

  .Select-menu-outer {
    border: 0.0625rem solid
      ${ifProp(
        ['invalid', 'isDirty'],
        palette('danger', 3),
        palette('grayscale', 4),
      )};
    border-top-color: ${palette('grayscale', 5)};

    .Select-option.is-focused {
      background-color: ${palette('primary', 7)};
    }
  }
`

const SingleSelectValue = ({ value, options }) => {
  // RANGE type
  if (isArray(value)) {
    const selectedVal = find(options, o => {
      return o.value.join(',') === value.join(',')
    })

    return <span>{selectedVal.label}</span>
  }

  return <span>{value.label}</span>
}

SingleSelectValue.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      label: PropTypes.string,
    }),
  ]),
}

const MultiSelectValue = ({ id, value, disabled, onRemove }) => (
  <Badge
    id={id}
    onClick={() => {
      if (!disabled) onRemove(value)
    }}
  >
    {value.label}
  </Badge>
)

MultiSelectValue.propTypes = {
  id: PropTypes.string,
  value: PropTypes.object,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
}

const singleSelectChangeHandler = func => value =>
  func(value ? value.value : '')

const multiSelectChangeHandler = func => values =>
  func(values.map(value => value.value))

const Select = ({ options, input, type, invalid, setIsDirty, ...props }) => {
  const multi = type === 'multi-select'
  // https://github.com/erikras/redux-form/issues/2229
  // https://github.com/erikras/redux-form/issues/2805
  //
  // Making an initial or new selection works as expected. However, when clicking
  // the dropdown and clicking away instead of making a new selection, the previous
  // value disappears.
  //
  // Solution: ignore the onBlur passed down from Field
  const selectProps = omit(input, ['onBlur', 'onChange'])

  const SingleValue = props => (
    <SingleSelectValue options={options} {...props} />
  )

  return (
    <StyledReactSelect
      className="select"
      autoBlur
      options={options}
      multi={multi}
      onChange={
        multi
          ? multiSelectChangeHandler(input.onChange)
          : singleSelectChangeHandler(input.onChange)
      }
      valueComponent={multi ? MultiSelectValue : SingleValue}
      invalid={invalid}
      {...selectProps}
      {...props}
      onBlur={val => {
        setIsDirty(true)
        input.onBlur(val)
      }}
    />
  )
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  invalid: PropTypes.bool,
  // Manually set dirty to allow us to correctly show our error/invalid
  // state as `react-select` doesn't handle it well enough
  setIsDirty: PropTypes.func.isRequired,
}

export default Select
