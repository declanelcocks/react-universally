import React from 'react'
import { storiesOf } from '@storybook/react'
import Price from '.'

storiesOf('Price', module).add('default', () => (
  <Price amount={10.1239102391} />
))
