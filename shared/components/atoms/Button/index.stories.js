import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '.'

storiesOf('Button', module)
  .add('default', () => (
    <div>
      <Button palette="primary">Hello</Button>
      <Button palette="secondary">Hello</Button>
      <Button palette="accent">Hello</Button>
    </div>
  ))
  .add('primary palette', () => (
    <div>
      <Button palette="primary">Hello</Button>
      <Button palette="primary" disabled>
        Hello
      </Button>
      <Button palette="primary" transparent>
        Hello
      </Button>
      <Button palette="primary" transparent disabled>
        Hello
      </Button>
    </div>
  ))
  .add('secondary palette', () => (
    <div>
      <Button palette="secondary">Hello</Button>
      <Button palette="secondary" disabled>
        Hello
      </Button>
      <Button palette="secondary" transparent>
        Hello
      </Button>
      <Button palette="secondary" transparent disabled>
        Hello
      </Button>
    </div>
  ))
  .add('accent palette', () => (
    <div>
      <Button palette="accent">Hello</Button>
      <Button palette="accent" disabled>
        Hello
      </Button>
      <Button palette="accent" transparent>
        Hello
      </Button>
      <Button palette="accent" transparent disabled>
        Hello
      </Button>
    </div>
  ))
  .add('link', () => (
    <div>
      <Button href="https://google.com">My website</Button>
      <Button href="https://google.com">My website</Button>
      <Button href="https://google.com">My website</Button>
    </div>
  ))
  .add('small', () => (
    <div>
      <Button small>Hello</Button>
      <Button small>Hello</Button>
      <Button small>Hello</Button>
    </div>
  ))
