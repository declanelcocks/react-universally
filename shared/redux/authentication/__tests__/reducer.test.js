import { initialState } from '../selectors'
import * as actions from '../actions'
import reducer from '../reducer'

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

describe('SET_USER', () => {
  const emptyAction = {
    type: actions.SET_USER,
  }

  const emptyPayload = {
    type: actions.SET_USER,
    payload: null,
  }

  const action = {
    type: actions.SET_USER,
    payload: { user: { id: 1 } },
  }

  const state = {
    ...initialState,
    user: { id: 2 },
  }

  expect(reducer(undefined, emptyAction)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyAction)).toEqual({ ...initialState })

  expect(reducer(undefined, emptyPayload)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyPayload)).toEqual({ ...initialState })

  expect(reducer(undefined, action)).toEqual({
    ...initialState,
    user: action.payload.user,
  })
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    user: action.payload.user,
  })
  expect(reducer(state, action)).toEqual({
    ...state,
    user: action.payload.user,
  })
  expect(reducer(state, emptyAction)).toEqual({
    ...state,
  })
})

describe('SET_AUTHENTICATED', () => {
  const emptyAction = {
    type: actions.SET_AUTHENTICATED,
  }

  const emptyPayload = {
    type: actions.SET_AUTHENTICATED,
    payload: null,
  }

  const action = {
    type: actions.SET_AUTHENTICATED,
    payload: { authenticated: true },
  }

  const state = {
    ...initialState,
    authenticated: false,
  }

  expect(reducer(undefined, emptyAction)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyAction)).toEqual({ ...initialState })

  expect(reducer(undefined, emptyPayload)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyPayload)).toEqual({ ...initialState })

  expect(reducer(undefined, action)).toEqual({
    ...initialState,
    authenticated: action.payload.authenticated,
  })
  expect(reducer(initialState, action)).toEqual({
    ...initialState,
    authenticated: action.payload.authenticated,
  })
  expect(reducer(state, action)).toEqual({
    ...initialState,
    authenticated: action.payload.authenticated,
  })
})

describe('SET_ERROR', () => {
  const emptyAction = {
    type: actions.SET_ERROR,
  }

  expect(reducer(undefined, emptyAction)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyAction)).toEqual({ ...initialState })

  const emptyPayload = {
    type: actions.SET_ERROR,
    payload: null,
  }

  expect(reducer(undefined, emptyPayload)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyPayload)).toEqual({ ...initialState })

  const payloadWithNoMessage = {
    type: actions.SET_ERROR,
    payload: { name: 'signup' },
  }

  const action = {
    type: actions.SET_ERROR,
    payload: { name: 'signup', error: 'error msg' },
  }

  const state = {
    something: true,
    state: {
      somethingElse: true,
      signup: {
        loading: true,
        error: null,
      },
    },
  }

  expect(reducer(state, payloadWithNoMessage)).toEqual({
    ...state,
    state: {
      ...state.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })

  expect(reducer(state, action)).toEqual({
    ...state,
    state: {
      ...state.state,
      signup: {
        loading: false,
        error: 'error msg',
      },
    },
  })
})

describe('SIGNUP_SUCCESS', () => {
  const emptyAction = {
    type: actions.SIGNUP_SUCCESS,
  }

  expect(reducer(undefined, emptyAction)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })
  expect(reducer(initialState, emptyAction)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })

  const emptyPayload = {
    type: actions.SIGNUP_SUCCESS,
    payload: null,
  }

  expect(reducer(undefined, emptyPayload)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })
  expect(reducer(initialState, emptyPayload)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })

  const emptyUser = {
    type: actions.SIGNUP_SUCCESS,
    payload: { user: null },
  }

  const action = {
    type: actions.SIGNUP_SUCCESS,
    payload: { user: { id: 1 } },
  }

  const state = {
    authenticated: false,
    user: { id: 2 },
    state: {
      somethingElse: true,
      signup: {
        loading: true,
        error: '12345',
      },
    },
  }

  expect(reducer(state, emptyUser)).toEqual({
    ...state,
    authenticated: true,
    state: {
      ...state.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })

  expect(reducer(state, action)).toEqual({
    ...state,
    user: { id: 1 },
    authenticated: true,
    state: {
      ...state.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })
})

describe('SIGNUP_FAIL', () => {
  const emptyAction = {
    type: actions.SIGNUP_FAIL,
  }

  expect(reducer(undefined, emptyAction)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyAction)).toEqual({ ...initialState })

  const emptyPayload = {
    type: actions.SIGNUP_FAIL,
    payload: null,
  }

  expect(reducer(undefined, emptyPayload)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyPayload)).toEqual({ ...initialState })

  const action = {
    type: actions.SIGNUP_FAIL,
    payload: { user: { id: 1 } },
  }

  const state = {
    authenticated: false,
    user: { id: 2 },
    state: {
      somethingElse: true,
      signup: {
        loading: true,
        error: '12345',
      },
    },
  }

  expect(reducer(state, action)).toEqual({
    ...state,
    user: initialState.user,
    authenticated: initialState.authenticated,
    state: {
      ...state.state,
      signup: {
        loading: false,
        error: null,
      },
    },
  })
})

describe('SIGNIN_SUCCESS', () => {
  const emptyAction = {
    type: actions.SIGNIN_SUCCESS,
  }

  const emptyPayload = {
    type: actions.SIGNIN_SUCCESS,
    payload: null,
  }

  const action = {
    type: actions.SIGNIN_SUCCESS,
    payload: { user: { id: 1 } },
  }

  const state = {
    authenticated: false,
    user: { id: 2 },
    state: {
      somethingElse: true,
      signin: {
        loading: true,
        error: '12345',
      },
    },
  }

  expect(reducer(undefined, emptyAction)).toEqual({
    ...initialState,
    user: initialState.user,
    authenticated: true,
    state: {
      ...initialState.state,
      signin: {
        loading: false,
        error: null,
      },
    },
  })

  expect(reducer(initialState, emptyPayload)).toEqual({
    ...initialState,
    user: initialState.user,
    authenticated: true,
    state: {
      ...initialState.state,
      signin: {
        loading: false,
        error: null,
      },
    },
  })

  expect(reducer(state, emptyPayload)).toEqual({
    ...state,
    user: state.user,
    authenticated: true,
    state: {
      ...state.state,
      signin: {
        loading: false,
        error: null,
      },
    },
  })

  expect(reducer(state, action)).toEqual({
    ...state,
    user: action.payload.user,
    authenticated: true,
    state: {
      ...state.state,
      signin: {
        loading: false,
        error: null,
      },
    },
  })
})

describe('SIGNIN_FAIL', () => {
  const emptyAction = {
    type: actions.SIGNIN_FAIL,
  }

  expect(reducer(undefined, emptyAction)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyAction)).toEqual({ ...initialState })

  const emptyPayload = {
    type: actions.SIGNIN_FAIL,
    payload: null,
  }

  expect(reducer(undefined, emptyPayload)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyPayload)).toEqual({ ...initialState })

  const action = {
    type: actions.SIGNIN_FAIL,
    payload: { user: { id: 1 } },
  }

  const state = {
    authenticated: true,
    user: { id: 2 },
    state: {
      somethingElse: true,
      signin: {
        loading: true,
        error: '12345',
      },
    },
  }

  expect(reducer(state, action)).toEqual({
    ...state,
    user: initialState.user,
    authenticated: initialState.authenticated,
    state: {
      ...state.state,
      signin: {
        loading: false,
        error: null,
      },
    },
  })
})

describe('UPDATE_SUCCESS', () => {
  const emptyAction = {
    type: actions.UPDATE_SUCCESS,
  }

  expect(reducer(undefined, emptyAction)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })
  expect(reducer(initialState, emptyAction)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })

  const emptyPayload = {
    type: actions.UPDATE_SUCCESS,
    payload: null,
  }

  expect(reducer(undefined, emptyPayload)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })
  expect(reducer(initialState, emptyPayload)).toEqual({
    ...initialState,
    authenticated: true,
    state: {
      ...initialState.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })

  const emptyUser = {
    type: actions.UPDATE_SUCCESS,
    payload: { user: null },
  }

  const action = {
    type: actions.UPDATE_SUCCESS,
    payload: { user: { id: 1 } },
  }

  const state = {
    authenticated: false,
    user: { id: 2 },
    state: {
      somethingElse: true,
      update: {
        loading: true,
        error: '12345',
      },
    },
  }

  expect(reducer(state, emptyUser)).toEqual({
    ...state,
    authenticated: true,
    state: {
      ...state.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })

  expect(reducer(state, action)).toEqual({
    ...state,
    user: { id: 1 },
    authenticated: true,
    state: {
      ...state.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })
})

describe('UPDATE_FAIL', () => {
  const emptyAction = {
    type: actions.UPDATE_FAIL,
  }

  expect(reducer(undefined, emptyAction)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyAction)).toEqual({ ...initialState })

  const emptyPayload = {
    type: actions.UPDATE_FAIL,
    payload: null,
  }

  expect(reducer(undefined, emptyPayload)).toEqual({ ...initialState })
  expect(reducer(initialState, emptyPayload)).toEqual({ ...initialState })

  const action = {
    type: actions.UPDATE_FAIL,
    payload: { user: { id: 1 } },
  }

  const state = {
    authenticated: true,
    user: { id: 2 },
    state: {
      somethingElse: true,
      update: {
        loading: true,
        error: '12345',
      },
    },
  }

  expect(reducer(state, action)).toEqual({
    ...state,
    state: {
      ...state.state,
      update: {
        loading: false,
        error: null,
      },
    },
  })
})
