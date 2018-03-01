import React from 'react'
import { shallow } from 'enzyme'

import NotFound from '../index'

describe('<NotFound />', () => {
  test('renders', () => {
    const staticContext = {}
    const wrapper = shallow(<NotFound staticContext={staticContext} />)
    expect(wrapper).toMatchSnapshot()
    expect(staticContext.missed).toBeTruthy()
  })
})
