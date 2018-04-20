import React from 'react'
import { storiesOf } from '@storybook/react'
import Label from '.'
import P from '../P'

storiesOf('Label', module)
  .add('default', () => (
    <div>
      <Label>Hello</Label>
      <P>this is some text</P>
    </div>
  ))
  .add('red palette', () => (
    <div>
      <Label palette="red">Hello</Label>
      <P>this is some text</P>
    </div>
  ))
