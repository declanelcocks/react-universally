export const initialState = {
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

export const selectAuthenticated = (state = initialState) => {
  return state.authenticated
}

export const selectUser = (state = initialState) => {
  if (!state.user || Object.keys(state.user) === 0) return initialState.user

  return state.user
}

export const selectLoading = (state = initialState, name) => {
  if (!name || !state.state || !state.state[name]) return false

  return state.state[name].loading
}

export const selectError = (state = initialState, name) => {
  if (!name || !state.state || !state.state[name]) return null

  return state.state[name].error
}
