import React from 'react'
import { storiesOf } from '@storybook/react'

import Logo from '.'

storiesOf('Logo', module)
  .add('default', () => <Logo />)
  .add('default with text', () => <Logo withText />)
  .add('medium', () => <Logo size="medium" />)
  .add('medium with text', () => <Logo size="medium" withText />)
  .add('palette', () => <Logo palette="secondary" withText />)
