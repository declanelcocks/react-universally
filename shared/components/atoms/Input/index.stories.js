import React from 'react'
import { storiesOf } from '@storybook/react'

import Input from '.'

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('with placeholder', () => <Input placeholder="First Name" />)
  .add('invalid', () => <Input invalid placeholder="First Name" />)
  .add('invalid with placeholder', () => (
    <Input invalid placeholder="First Name" />
  ))
  .add('disabled', () => <Input disabled />)
  .add('disabled with placeholder', () => (
    <Input disabled placeholder="Input Price" />
  ))
  .add('type textarea', () => <Input type="textarea" />)
  .add('type checkbox', () => <Input type="checkbox" />)
  .add('type radio', () => <Input type="radio" />)
