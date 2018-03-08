import React from 'react'
import { storiesOf } from '@storybook/react'
import Link from '.'

storiesOf('Link', module)
  .add('default', () => <Link href="https://google.com">Google</Link>)
  .add('another palette', () => (
    <Link href="https://google.com" palette="secondary">
      Google
    </Link>
  ))
