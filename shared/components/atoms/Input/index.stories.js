import React from 'react'
import { storiesOf } from '@storybook/react'

import Input from '.'

storiesOf('Input', module)
  .add('default', () => <Input />)
  .add('invalid', () => <Input invalid />)
  .add('type textarea', () => <Input type="textarea" />)
  .add('type checkbox', () => <Input type="checkbox" />)
  .add('type radio', () => <Input type="radio" />)
