import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shallowequal from 'shallowequal'
import shouldUpdate from './shouldUpdate'

const noop = () => {}

class Headroom extends Component {
  constructor(props) {
    super(props)

    this.currentScrollY = 0
    this.lastKnownScrollY = 0
    this.scrollTicking = false
    this.resizeTicking = false

    this.state = {
      state: 'unfixed',
      translateY: 0,
    }
  }

  componentDidMount() {
    this.setHeightOffset()
    this.props.parent().addEventListener('scroll', this.handleScroll)

    if (this.props.calcHeightOnResize) {
      this.props.parent().addEventListener('resize', this.handleResize)
    }
  }

  componentWillReceiveProps() {
    this.props.parent().addEventListener('scroll', this.handleScroll)

    if (this.props.calcHeightOnResize) {
      this.props.parent().addEventListener('resize', this.handleResize)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowequal(this.props, nextProps) ||
      !shallowequal(this.state, nextState)
    )
  }

  componentWillUnmount() {
    this.props.parent().removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
    this.props.parent().removeEventListener('resize', this.handleResize)
  }

  // eslint-disable-next-line no-return-assign
  setRef = ref => (this.inner = ref)

  setHeightOffset = () => {
    this.setState({
      height: this.inner.offsetHeight,
    })
    this.resizeTicking = false
  }

  getScrollY = () => {
    if (this.props.parent().pageYOffset !== undefined) {
      return this.props.parent().pageYOffset
    } else if (this.props.parent().scrollTop !== undefined) {
      return this.props.parent().scrollTop
    }

    return (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop
  }

  getViewportHeight = () =>
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight

  getDocumentHeight = () => {
    const { body, documentElement } = document

    return Math.max(
      body.scrollHeight,
      documentElement.scrollHeight,
      body.offsetHeight,
      documentElement.offsetHeight,
      body.clientHeight,
      documentElement.clientHeight,
    )
  }

  getElementPhysicalHeight = elm => Math.max(elm.offsetHeight, elm.clientHeight)

  getElementHeight = elm =>
    Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight)

  getScrollerPhysicalHeight = () => {
    const parent = this.props.parent()

    return parent === window || parent === document.body
      ? this.getViewportHeight()
      : this.getElementPhysicalHeight(parent)
  }

  getScrollerHeight = () => {
    const parent = this.props.parent()

    return parent === window || parent === document.body
      ? this.getDocumentHeight()
      : this.getElementHeight(parent)
  }

  isOutOfBound = currentScrollY => {
    const pastTop = currentScrollY < 0

    const scrollerPhysicalHeight = this.getScrollerPhysicalHeight()
    const scrollerHeight = this.getScrollerHeight()

    const pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight

    return pastTop || pastBottom
  }

  handleScroll = () => {
    if (!this.scrollTicking) {
      this.scrollTicking = true
      this.update()
    }
  }

  handleResize = () => {
    if (!this.resizeTicking) {
      this.resizeTicking = true
      this.setHeightOffset()
    }
  }

  unpin = () => {
    this.props.onUnpin()

    this.setState(
      {
        translateY: '-100%',
      },
      () => {
        setTimeout(() => {
          this.setState({ state: 'unpinned' })
        }, 0)
      },
    )
  }

  pin = () => {
    this.props.onPin()

    this.setState({
      translateY: 0,
      state: 'pinned',
    })
  }

  unfix = () => {
    this.props.onUnfix()

    this.setState({
      translateY: 0,
      state: 'unfixed',
    })
  }

  update = () => {
    this.currentScrollY = this.getScrollY()

    if (!this.isOutOfBound(this.currentScrollY)) {
      const action = shouldUpdate(
        this.lastKnownScrollY,
        this.currentScrollY,
        this.props,
        this.state,
      )

      if (action === 'pin') {
        this.pin()
      } else if (action === 'unpin') {
        this.unpin()
      } else if (action === 'unfix') {
        this.unfix()
      }
    }

    this.lastKnownScrollY = this.currentScrollY
    this.scrollTicking = false
  }

  render() {
    let innerStyle = {
      position: this.state.state === 'unfixed' ? 'relative' : 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      transform: `translateY(${this.state.translateY})`,
    }

    // Don't add css transitions until after we've done the initial
    // negative transform when transitioning from 'unfixed' to 'unpinned'.
    // If we don't do this, the header will flash into view temporarily
    // while it transitions from 0 — -100%.
    if (this.state.state !== 'unfixed') {
      innerStyle = {
        ...innerStyle,
        transition: 'all .2s ease-in-out',
        height: this.state.height ? this.state.height : null,
      }
    }

    return (
      <div ref={this.setRef} style={innerStyle}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

Headroom.defaultProps = {
  parent: () => window,
  pinScrollThreshold: 5,
  unpinScrollThreshold: 0,
  onPin: noop,
  onUnpin: noop,
  onUnfix: noop,
  calcHeightOnResize: true,
}

Headroom.propTypes = {
  parent: PropTypes.func,
  render: PropTypes.func.isRequired,
  upTolerance: PropTypes.number,
  downTolerance: PropTypes.number,
  onPin: PropTypes.func,
  onUnpin: PropTypes.func,
  onUnfix: PropTypes.func,
  calcHeightOnResize: PropTypes.bool,
}

export default Headroom
