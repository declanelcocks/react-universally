import React from 'react'
import { storiesOf } from '@storybook/react'
import Block from '.'

storiesOf('Block', module)
  .add('default', () => (
    <Block>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('inline', () => (
    <div>
      <Block inline>My first Block.</Block>
      <Block inline>My second Block.</Block>
    </div>
  ))
  .add('reverse', () => (
    <Block reverse>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('palette', () => (
    <Block palette="primary">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('palette opaque', () => (
    <Block palette="primary" opaque>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
