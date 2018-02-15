import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from '.'

storiesOf('Icon', module)
  .add('default', () => (
    <div>
      <Icon icon="close" />
      <Icon icon="copy" />
      <Icon icon="docs" />
      <Icon icon="github" />
    </div>
  ))
  .add('palette', () => <Icon icon="close" palette="primary" />)
  .add('palette reverse', () => <Icon icon="close" palette="primary" reverse />)
