import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SizePicker from '.'

storiesOf('SizePicker', module).add('default', () => (
  <SizePicker handleChooseSize={action('handleChooseSize')} />
))
