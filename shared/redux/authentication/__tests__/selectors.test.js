import * as selectors from '../selectors'

test('initialState', () => {
  const initialState = {
    user: {},
    authenticated: false,
    state: {
      signup: {
        loading: false,
        error: null,
      },
      signin: {
        loading: false,
        error: null,
      },
      update: {
        loading: false,
        error: null,
      },
    },
  }

  expect(selectors.initialState).toEqual(initialState)
})

test('selectUser', () => {
  expect(selectors.selectUser(undefined)).toEqual({})
  expect(selectors.selectUser({})).toEqual({})
  expect(selectors.selectUser(selectors.initialState)).toEqual({})

  expect(selectors.selectUser({ user: { id: 1, name: 'user name' } })).toEqual({
    id: 1,
    name: 'user name',
  })
})

test('selectLoading', () => {
  const emptyState = {
    state: {
      signup: { loading: false },
    },
  }

  const loadingState = {
    state: {
      signup: { loading: true },
    },
  }

  expect(selectors.selectLoading(undefined)).toEqual(false)
  expect(selectors.selectLoading({})).toEqual(false)
  expect(selectors.selectLoading(selectors.initialState)).toEqual(false)

  expect(selectors.selectLoading(emptyState)).toEqual(false)
  expect(selectors.selectLoading(emptyState, 'signup')).toEqual(false)
  expect(selectors.selectLoading(loadingState, 'signin')).toEqual(false)
  expect(selectors.selectLoading(loadingState, 'signup')).toEqual(true)
})

test('selectError', () => {
  const emptyState = {
    state: {
      signup: { error: null },
    },
  }

  const errorState = {
    state: {
      signup: { error: 'my error msg' },
    },
  }

  expect(selectors.selectError(undefined)).toEqual(null)
  expect(selectors.selectError({})).toEqual(null)
  expect(selectors.selectError(selectors.initialState)).toEqual(null)
  expect(selectors.selectError(undefined, 'signup')).toEqual(null)
  expect(selectors.selectError({}, 'signup')).toEqual(null)
  expect(selectors.selectError(selectors.initialState, 'signup')).toEqual(null)

  expect(selectors.selectError(emptyState)).toEqual(null)
  expect(selectors.selectError(emptyState, 'signup')).toEqual(null)
  expect(selectors.selectError(errorState, 'signin')).toEqual(null)
  expect(selectors.selectError(errorState, 'signup')).toEqual('my error msg')
})
