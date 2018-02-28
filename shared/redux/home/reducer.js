import reducerRegistry from '../reducerRegistry'

const initialState = {
  status: null,
}

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_STATUS': {
      return {
        ...state,
        status: payload,
      }
    }
    default:
      return state
  }
}

reducerRegistry.register('home', reducer)

export default reducer
