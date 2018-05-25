import config from '../../../config'

export const SET_USER = 'AUTH/SET_USER'
export const SET_AUTHENTICATED = 'AUTH/SET_AUTHENTICATED'
export const SET_ERROR = 'AUTH/SET_ERROR'
export const SIGNUP_SUCCESS = 'AUTH/SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'AUTH/SIGNUP_FAIL'
export const SIGNIN_SUCCESS = 'AUTH/SIGNIN_SUCCESS'
export const SIGNIN_FAIL = 'AUTH/SIGNIN_FAIL'
export const UPDATE_SUCCESS = 'AUTH/UPDATE_SUCCESS'
export const UPDATE_FAIL = 'AUTH/UPDATE_FAIL'

export const setUser = user => ({
  type: SET_USER,
  payload: { user },
})

export const setAuthenticated = authenticated => ({
  type: SET_AUTHENTICATED,
  payload: { authenticated },
})

export const setError = (name, error) => ({
  type: SET_ERROR,
  payload: { name, error },
})

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: { user },
})

export const signupError = error => ({
  type: SIGNUP_FAIL,
  payload: { error },
})

export const signinSuccess = user => ({
  type: SIGNIN_SUCCESS,
  payload: { user },
})

export const signinError = error => ({
  type: SIGNIN_FAIL,
  payload: { error },
})

export const updateSuccess = user => ({
  type: UPDATE_SUCCESS,
  payload: { user },
})

export const updateError = error => ({
  type: UPDATE_FAIL,
  payload: { error },
})

export const register = ({ email, password }) => (
  dispatch,
  getState,
  { api },
) =>
  api.post(`${config('authApiUrl')}/register`, { email, password }).then(
    ({ data }) => {
      const { token, ...user } = data
      api.setToken(token)
      dispatch(signupSuccess(user))
    },
    err => dispatch(signupError(err.message)),
  )

export const signin = ({ email, password }) => (dispatch, getState, { api }) =>
  api.post(`${config('authApiUrl')}/login`, { email, password }).then(
    ({ data }) => {
      const { token, ...user } = data
      api.setToken(token)
      dispatch(signinSuccess(user))
    },
    err => dispatch(signinError(err.message)),
  )

export const getUser = () => (dispatch, getState, { api }) =>
  api.get(`${config('authApiUrl')}/me`).then(
    ({ data }) => {
      const { token, ...user } = data
      api.setToken(token)
      dispatch(signinSuccess(user))
    },
    err => {
      api.unsetToken()
      dispatch(signinError(err.message))
    },
  )

export const updateUser = user => (dispatch, getState, { api }) => {
  const { authentication: { user: currentUser = {} } = {} } = getState()

  if (!currentUser.id)
    return Promise.resolve(dispatch(updateError('No user found')))

  return api.put(`/user/${currentUser.id}`, user).then(
    ({ data }) => {
      const { token, ...user } = data
      api.setToken(token)
      dispatch(updateSuccess(user))
    },
    err => dispatch(updateError(err.message)),
  )
}
