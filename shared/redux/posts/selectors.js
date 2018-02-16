export function getPostById(state, id) {
  return state.posts.byId[id]
}

export function getAllPosts(state) {
  return state.posts.all.map(id => getPostById(state, id))
}
