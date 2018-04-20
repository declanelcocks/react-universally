import React from 'react'
import { storiesOf } from '@storybook/react'
import Heading from '.'

storiesOf('Heading', module).add('default', () => (
  <div>
    <Heading level={1}>Id tempor duis non esse.</Heading>
    <Heading level={2}>Id tempor duis non esse.</Heading>
    <Heading level={3}>Id tempor duis non esse.</Heading>
    <Heading level={4}>Id tempor duis non esse.</Heading>
  </div>
))
