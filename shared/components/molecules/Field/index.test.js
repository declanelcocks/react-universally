import React from 'react'
import { shallow, mount } from 'enzyme'

import Field from '.'

const mockProps = {
  input: { name: 'name', onChange: () => {} },
  meta: {},
}

const wrap = props => shallow(<Field name="name" {...mockProps} {...props} />)
const wrapWithMount = props =>
  mount(<Field name="name" {...mockProps} {...props} />)

it('renders input props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})

it('renders name', () => {
  const wrapper = wrap()
  expect(wrapper.find({ name: 'name' })).toHaveLength(1)
})

it('renders label when passed in', () => {
  const wrapper = wrapWithMount({ label: 'foo label' })
  expect(wrapper.contains('foo label')).toBe(true)
})

it('does not render error when passed in without invalid', () => {
  const wrapper = wrapWithMount({ meta: { error: 'foo error' } })
  expect(wrapper.contains('foo error')).toBe(false)
})

it('does not render error when passed in without touched', () => {
  const wrapper = wrapWithMount({ meta: { error: 'foo error', invalid: true } })
  expect(wrapper.contains('foo error')).toBe(false)
})

it('renders error when passed in along with invalid', () => {
  const wrapper = wrapWithMount({
    meta: { error: 'foo error', touched: true, invalid: true },
  })
  expect(wrapper.contains('foo error')).toBe(true)
})
