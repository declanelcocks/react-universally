import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import apiService from '../../../services/api'
import * as actions from '../actions'

const api = apiService.create()

const middlewares = [thunk.withExtraArgument({ api })]
const mockStore = configureMockStore(middlewares)

test('setUser', () => {
  const user = { id: 1 }

  expect(actions.setUser(user)).toEqual(
    expect.objectContaining({
      type: actions.SET_USER,
      payload: { user },
    }),
  )
})

test('setAuthenticated', () => {
  const authenticated = true

  expect(actions.setAuthenticated(authenticated)).toEqual(
    expect.objectContaining({
      type: actions.SET_AUTHENTICATED,
      payload: { authenticated },
    }),
  )
})

test('setError', () => {
  const error = { name: 'signin', error: 'msg' }

  expect(actions.setError(error.name, error.error)).toEqual(
    expect.objectContaining({
      type: actions.SET_ERROR,
      payload: error,
    }),
  )

  expect(actions.setError(error.name)).toEqual(
    expect.objectContaining({
      type: actions.SET_ERROR,
      payload: { name: error.name, error: undefined },
    }),
  )
})

test('signupSuccess', () => {
  const user = { id: 1 }

  expect(actions.signupSuccess(user)).toEqual(
    expect.objectContaining({
      type: actions.SIGNUP_SUCCESS,
      payload: { user },
    }),
  )
})

test('signupError', () => {
  const error = { msg: 'error msg' }

  expect(actions.signupError(error)).toEqual(
    expect.objectContaining({
      type: actions.SIGNUP_FAIL,
      payload: { error },
    }),
  )
})

test('signinSuccess', () => {
  const user = { id: 1 }

  expect(actions.signinSuccess(user)).toEqual(
    expect.objectContaining({
      type: actions.SIGNIN_SUCCESS,
      payload: { user },
    }),
  )
})

test('signinError', () => {
  const error = { msg: 'error msg' }

  expect(actions.signinError(error)).toEqual(
    expect.objectContaining({
      type: actions.SIGNIN_FAIL,
      payload: { error },
    }),
  )
})

test('updateSuccess', () => {
  const user = { id: 1 }

  expect(actions.updateSuccess(user)).toEqual(
    expect.objectContaining({
      type: actions.UPDATE_SUCCESS,
      payload: { user },
    }),
  )
})

test('updateError', () => {
  const error = { msg: 'error msg' }

  expect(actions.updateError(error)).toEqual(
    expect.objectContaining({
      type: actions.UPDATE_FAIL,
      payload: { error },
    }),
  )
})

describe('register', () => {
  it('dispatches SIGNUP_SUCCESS after successfully registering', () => {
    createMockFetch(200, null, { data: { id: 1 } })
    const store = mockStore({})
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.register(user)).then(() => {
      const expectedActions = [
        { type: actions.SIGNUP_SUCCESS, payload: { user: { id: 1 } } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('sets the API token after successfully registering', () => {
    const store = mockStore({})
    const request = { email: 'test@test.com', password: 'test' }
    const response = { data: { id: 1, token: '12345' } }
    createMockFetch(200, null, response)
    api.setToken = jest.fn()

    return store.dispatch(actions.register(request)).then(() => {
      expect(api.setToken).toHaveBeenCalledWith(response.data.token)
    })
  })

  it('dispatches SIGNUP_FAIL after failing to register', () => {
    createMockFetch(422, 'Unprocessible Entity', {
      errors: [{ msg: 'Invalid password' }],
    })
    const store = mockStore({})
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.register(user)).then(() => {
      const expectedActions = [
        { type: actions.SIGNUP_FAIL, payload: { error: 'Invalid password' } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('signin', () => {
  it('dispatches SIGNIN_SUCCESS after successfully signing in', () => {
    createMockFetch(200, null, { data: { id: 1 } })
    const store = mockStore({})
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.signin(user)).then(() => {
      const expectedActions = [
        { type: actions.SIGNIN_SUCCESS, payload: { user: { id: 1 } } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('sets the API token after successfully signing in', () => {
    const store = mockStore({})
    const request = { email: 'test@test.com', password: 'test' }
    const response = { data: { id: 1, token: '12345' } }
    createMockFetch(200, null, response)
    api.setToken = jest.fn()

    return store.dispatch(actions.signin(request)).then(() => {
      expect(api.setToken).toHaveBeenCalledWith(response.data.token)
    })
  })

  it('dispatches SIGNIN_FAIL after failing to sign in', () => {
    createMockFetch(422, 'Unprocessible Entity', {
      errors: [{ msg: 'Invalid password' }],
    })
    const store = mockStore({})
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.signin(user)).then(() => {
      const expectedActions = [
        { type: actions.SIGNIN_FAIL, payload: { error: 'Invalid password' } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('getUser', () => {
  it('dispatches SIGNIN_SUCCESS after successfully getting the user', () => {
    createMockFetch(200, null, { data: { id: 1 } })
    const store = mockStore({})

    return store.dispatch(actions.getUser()).then(() => {
      const expectedActions = [
        { type: actions.SIGNIN_SUCCESS, payload: { user: { id: 1 } } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('sets the API token after successfully getting the user', () => {
    const store = mockStore({})
    const response = { data: { id: 1, token: '12345' } }
    createMockFetch(200, null, response)
    api.setToken = jest.fn()

    return store.dispatch(actions.getUser()).then(() => {
      expect(api.setToken).toHaveBeenCalledWith(response.data.token)
    })
  })

  it('removes the API token after failing to get the user', () => {
    const store = mockStore({})
    createMockFetch(400)
    api.unsetToken = jest.fn()

    return store.dispatch(actions.getUser()).then(() => {
      expect(api.unsetToken).toHaveBeenCalled()
    })
  })

  it('dispatches SIGNIN_FAIL after failing to get the user', () => {
    createMockFetch(422, 'Unprocessible Entity', {
      errors: [{ msg: 'Invalid password' }],
    })
    const store = mockStore({})

    return store.dispatch(actions.getUser()).then(() => {
      const expectedActions = [
        { type: actions.SIGNIN_FAIL, payload: { error: 'Invalid password' } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('updateUser', () => {
  it('dispatches UPDATE_SUCCESS after successfully registering', () => {
    createMockFetch(200, null, { data: { id: 1 } })
    const store = mockStore({
      authentication: {
        user: { id: 1 },
      },
    })
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.updateUser(user)).then(() => {
      const expectedActions = [
        { type: actions.UPDATE_SUCCESS, payload: { user: { id: 1 } } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('sets the API token after successfully registering', () => {
    const store = mockStore({
      authentication: {
        user: { id: 1 },
      },
    })
    const request = { email: 'test@test.com', password: 'test' }
    const response = { data: { id: 1, token: '12345' } }
    createMockFetch(200, null, response)
    api.setToken = jest.fn()

    return store.dispatch(actions.updateUser(request)).then(() => {
      expect(api.setToken).toHaveBeenCalledWith(response.data.token)
    })
  })

  it('dispatches UPDATE_FAIL if no user is in the authentication store', () => {
    createMockFetch(422, 'Unprocessible Entity', {
      errors: [{ msg: 'Oops!' }],
    })
    const store = mockStore({})
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.updateUser(user)).then(() => {
      const expectedActions = [
        { type: actions.UPDATE_FAIL, payload: { error: 'No user found' } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatches UPDATE_FAIL after failing to register', () => {
    createMockFetch(422, 'Unprocessible Entity', {
      errors: [{ msg: 'Oops!' }],
    })
    const store = mockStore({
      authentication: {
        user: { id: 1 },
      },
    })
    const user = { email: 'test@test.com', password: 'test' }

    return store.dispatch(actions.updateUser(user)).then(() => {
      const expectedActions = [
        { type: actions.UPDATE_FAIL, payload: { error: 'Oops!' } },
      ]

      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
