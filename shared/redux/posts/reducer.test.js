import reducer from './reducer'

describe('Posts reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      all: [],
      byId: {},
    })
  })
})
