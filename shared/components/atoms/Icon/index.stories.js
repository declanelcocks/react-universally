import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from '.'

storiesOf('Icon', module)
  .add('default', () => (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Icon icon="logo" />
        <Icon icon="basket" />
        <Icon icon="cart" />
        <Icon icon="close" />
        <Icon icon="copy" />
        <Icon icon="docs" />
        <Icon icon="github" />
        <Icon icon="heart" />
        <Icon icon="twitter" />
        <Icon icon="facebook-f" />
        <Icon icon="facebook" />
        <Icon icon="linkedin" />
        <Icon icon="bell" />
        <Icon icon="info" />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Icon icon="logo" palette="primary" />
        <Icon icon="basket" palette="primary" />
        <Icon icon="cart" palette="primary" />
        <Icon icon="close" palette="primary" />
        <Icon icon="copy" palette="primary" />
        <Icon icon="docs" palette="primary" />
        <Icon icon="github" palette="primary" />
        <Icon icon="heart" palette="primary" />
        <Icon icon="twitter" palette="primary" />
        <Icon icon="facebook-f" palette="primary" />
        <Icon icon="facebook" palette="primary" />
        <Icon icon="linkedin" palette="primary" />
        <Icon icon="bell" palette="primary" />
        <Icon icon="info" palette="primary" />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Icon icon="logo" height="3" />
        <Icon icon="basket" height="3" />
        <Icon icon="cart" height="3" />
        <Icon icon="close" height="3" />
        <Icon icon="copy" height="3" />
        <Icon icon="docs" height="3" />
        <Icon icon="github" height="3" />
        <Icon icon="heart" height="3" />
        <Icon icon="twitter" height="3" />
        <Icon icon="facebook-f" height="3" />
        <Icon icon="facebook" height="3" />
        <Icon icon="linkedin" height="3" />
        <Icon icon="bell" height="3" />
        <Icon icon="info" height="3" />
      </div>
    </div>
  ))
  .add('change palette on hover', () => (
    <div>
      <Icon icon="heart" palette="grayscale" hoverPalette="red" />
      <Icon icon="heart" palette="grayscale" hoverPalette="red" filled />
    </div>
  ))
  .add('filled icon', () => <Icon icon="heart" filled />)
  .add('fill on hover', () => (
    <Icon icon="heart" palette="grayscale" hoverPalette="red" fillOnHover />
  ))
  .add('unfill on hover', () => (
    <Icon
      icon="heart"
      palette="red"
      hoverPalette="grayscale"
      filled
      unfillOnHover
    />
  ))
