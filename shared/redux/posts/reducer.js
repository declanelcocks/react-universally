import reducerRegistry from '../reducerRegistry'

const initialState = {
  all: [],
  byId: {},
}

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'FETCHED_POST': {
      const post = payload
      return {
        ...state,
        all: state.all.find(x => post.id === x)
          ? state.all
          : [...state.all, payload.id],
        byId: {
          ...state.byId,
          [post.id]: post,
        },
      }
    }
    default:
      return state
  }
}

reducerRegistry.register('posts', reducer)

export default reducer
