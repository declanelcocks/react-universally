import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import StoryRouter from 'storybook-router'
import Wrapper from './Wrapper'

const req = require.context('../shared/components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(StoryRouter())

addDecorator(story => <Wrapper>{story()}</Wrapper>)

configure(loadStories, module)
