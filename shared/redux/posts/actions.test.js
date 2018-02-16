import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import apiService from '../../services/api'
import { fetch as fetchPosts } from './actions'

const api = apiService.create()

const middlewares = [thunk.withExtraArgument({ api })]
const mockStore = configureMockStore(middlewares)

describe('fetchPosts', () => {
  it('creates FETCHED_POST when fetching posts is done', () => {
    mockFetch(200, null, { id: 1 })
    const store = mockStore({})

    return store.dispatch(fetchPosts(1)).then(() => {
      const expectedActions = [
        { type: 'FETCHING_POST', payload: 1 },
        { type: 'FETCHED_POST', payload: { id: 1 } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
