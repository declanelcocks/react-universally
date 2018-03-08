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
  .add('palette', () => (
    <div>
      <Icon icon="close" palette="primary" />
      <Icon icon="copy" palette="primary" />
      <Icon icon="docs" palette="primary" />
      <Icon icon="github" palette="primary" />
    </div>
  ))
