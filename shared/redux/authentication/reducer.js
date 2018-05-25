import { initialState } from './selectors'
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from './actions'

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        ...(payload && payload.user && { user: payload.user }),
      }
    }
    case SET_AUTHENTICATED: {
      return {
        ...state,
        ...(payload &&
          payload.authenticated && { authenticated: payload.authenticated }),
      }
    }
    case SET_ERROR: {
      if (!payload) return state
      const { name, error = null } = payload
      if (!name) return state

      return {
        ...state,
        state: {
          ...state.state,
          [name]: {
            loading: false,
            error,
          },
        },
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        ...(payload && payload.user && { user: payload.user }),
        authenticated: true,
        state: {
          ...state.state,
          signup: {
            loading: false,
            error: null,
          },
        },
      }
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        user: initialState.user,
        authenticated: initialState.authenticated,
        state: {
          ...state.state,
          signup: {
            loading: false,
            error: (payload && payload.error) || null,
          },
        },
      }
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        ...(payload && payload.user && { user: payload.user }),
        authenticated: true,
        state: {
          ...state.state,
          signin: {
            loading: false,
            error: null,
          },
        },
      }
    }
    case SIGNIN_FAIL: {
      return {
        ...state,
        user: initialState.user,
        authenticated: initialState.authenticated,
        state: {
          ...state.state,
          signin: {
            loading: false,
            error: (payload && payload.error) || null,
          },
        },
      }
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        ...(payload && payload.user && { user: payload.user }),
        authenticated: true,
        state: {
          ...state.state,
          update: {
            loading: false,
            error: null,
          },
        },
      }
    }
    case UPDATE_FAIL: {
      return {
        ...state,
        state: {
          ...state.state,
          update: {
            loading: false,
            error: payload && payload.error ? payload.error : null,
          },
        },
      }
    }
    default:
      return state
  }
}

export default reducer
