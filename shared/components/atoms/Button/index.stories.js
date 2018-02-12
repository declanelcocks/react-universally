import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '.'

storiesOf('Button', module)
  .add('default', () => (
    <div>
      <Button>Hello</Button>
      <Button>Hello</Button>
      <Button>Hello</Button>
    </div>
  ))
  .add('reverse', () => (
    <div>
      <Button reverse>Hello</Button>
      <Button reverse>Hello</Button>
      <Button reverse>Hello</Button>
    </div>
  ))
  .add('another palette', () => (
    <div>
      <Button palette="secondary">Hello</Button>
      <Button palette="secondary">Hello</Button>
      <Button palette="secondary">Hello</Button>
    </div>
  ))
  .add('disabled', () => (
    <div>
      <Button disabled>Hello</Button>
      <Button disabled>Hello</Button>
      <Button disabled>Hello</Button>
    </div>
  ))
  .add('transparent', () => (
    <div>
      <Button transparent>Hello</Button>
      <Button transparent>Hello</Button>
      <Button transparent>Hello</Button>
    </div>
  ))
  .add('link', () => (
    <div>
      <Button href="https://google.com">My website</Button>
      <Button href="https://google.com">My website</Button>
      <Button href="https://google.com">My website</Button>
    </div>
  ))
