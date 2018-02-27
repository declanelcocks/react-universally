function fetching(id) {
  return { type: 'FETCHING_POST', payload: id }
}

function fetched(post) {
  return { type: 'FETCHED_POST', payload: post }
}

export function fetch(id) {
  return (dispatch, getState, { api }) => {
    dispatch(fetching(id))

    return api
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(data => dispatch(fetched(data)))
  }
}
