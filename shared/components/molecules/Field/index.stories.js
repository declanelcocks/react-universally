import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form, Field } from 'react-final-form'

import Button from '../../atoms/Button'
import FieldComponent from '.'

const required = value => (value ? undefined : 'Required')

storiesOf('Field', module).add('default', () => (
  <Form
    onSubmit={values => console.log(values)}
    subscription={{ submitting: true, pristine: true }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="one"
          label="Text"
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
          component={FieldComponent}
          validate={required}
        />

        <Field
          name="four"
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
