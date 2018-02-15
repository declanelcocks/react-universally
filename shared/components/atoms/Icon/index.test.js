import React from 'react'
import { shallow } from 'enzyme'
import Icon from '.'

const wrap = (props = {}) => shallow(<Icon icon="github" {...props} />).dive()

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
