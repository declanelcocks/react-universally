import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withConsole } from '@storybook/addon-console'
import StoryRouter from 'storybook-router'
import Wrapper from './Wrapper'

import './style.css'

const req = require.context('../shared/components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator((story, context) => withInfo()(story)(context))
addDecorator((storyFn, context) => withConsole()(storyFn)(context))
addDecorator(StoryRouter())
addDecorator(story => <Wrapper>{story()}</Wrapper>)

configure(loadStories, module)
