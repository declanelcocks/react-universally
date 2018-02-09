import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '.'

storiesOf('Button', module)
  .add('default', () => <Button>Hello</Button>)
  .add('reverse', () => <Button reverse>Hello</Button>)
  .add('another palette', () => <Button palette="secondary">Hello</Button>)
  .add('disabled', () => <Button disabled>Hello</Button>)
  .add('transparent', () => <Button transparent>Hello</Button>)
  .add('link', () => <Button href="https://google.com">My website</Button>)
