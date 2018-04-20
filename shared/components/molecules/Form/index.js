import React from 'react'
import PropTypes from 'prop-types'
import { Form as FinalForm } from 'react-final-form'

const Form = ({ name, onSubmit, render, ...props }) => (
  <FinalForm
    id={name}
    onSubmit={onSubmit}
    subscription={{ submitting: true, pristine: true }}
    render={render}
    {...props}
  />
)

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
}

export default Form
