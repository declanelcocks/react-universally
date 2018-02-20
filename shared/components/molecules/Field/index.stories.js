import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Field } from 'react-final-form'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'

import Button from '../../atoms/Button'
import FieldComponent from '.'

const required = value => {
  if (isBoolean(value) && value) return undefined
  if (typeof value === 'number' && value) return undefined
  return isEmpty(value) ? 'Required' : undefined
}

const options = [
  { label: 'Option #1', value: 1 },
  { label: 'Option #2', value: 2 },
  { label: 'Option #3', value: 3 },
]

storiesOf('Field', module).add('default', () => (
  <Form
    onSubmit={values => console.log(values)}
    subscription={{ submitting: true, pristine: true }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="one"
          label="Text"
          placeholder="Placeholder..."
          component={FieldComponent}
          validate={required}
        />

        <Field
          name="two"
          type="textarea"
          label="Textarea"
          component={FieldComponent}
          validate={required}
        />

        <Field
          name="three"
          type="select"
          label="Select"
          placeholder="Choose an option"
          component={FieldComponent}
          options={options}
          validate={required}
        />

        <Field
          name="four"
          type="multi-select"
          label="Multi-select"
          placeholder="Choose an option"
          component={FieldComponent}
          options={options}
          validate={required}
        />

        <Field
          name="five"
          type="checkbox"
          label="Checkbox"
          component={FieldComponent}
          validate={required}
        />

        <Field
          name="gender"
          type="radio"
          label="Male"
          value="male"
          component={FieldComponent}
          validate={required}
        />

        <Field
          name="gender"
          type="radio"
          label="Female"
          value="female"
          component={FieldComponent}
          validate={required}
        />

        <Button type="submit">Submit</Button>
      </form>
    )}
  />
))
