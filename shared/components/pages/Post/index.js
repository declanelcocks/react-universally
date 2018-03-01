import React from 'react'
import PropTypes from 'prop-types'
import { compose, setStatic, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import * as PostActions from '../../../redux/posts/actions'
import { getPostById } from '../../../redux/posts/selectors'

export function Post({ post }) {
  if (!post) {
    return null
  }

  const { title, body } = post

  return (
    <div>
      <Helmet title={`Posts - ${title}`} />

      <h1>{title}</h1>
      <div>{body}</div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
}

Post.defaultProps = {
  post: {},
}

const mapStateToProps = (state, { match }) => ({
  post: getPostById(state, match.params.id),
})

const mapActionsToProps = {
  fetchPost: PostActions.fetch,
}

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  setStatic('loadData', (match, store) =>
    store.dispatch(PostActions.fetch(match.params.id)),
  ),
  lifecycle({
    componentDidMount() {
      const { post, fetchPost, match } = this.props
      if (!post) fetchPost(match.params.id)
    },
    componentWillReceiveProps({ match: nextMatch }) {
      const { fetchPost, match } = this.props
      if (match.params.id !== nextMatch.params.id)
        fetchPost(nextMatch.params.id)
    },
  }),
)(Post)
