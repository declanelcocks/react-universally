export default function(
  lastKnownScrollY = 0,
  currentScrollY = 0,
  props = {},
  state = {},
) {
  const scrollDown = currentScrollY >= lastKnownScrollY
  const scrollUp = currentScrollY < lastKnownScrollY
  const distanceScrolled = Math.abs(currentScrollY - lastKnownScrollY)

  if (currentScrollY <= 0 && state.state !== 'unfixed') return 'unfix'

  // We're unfixed and headed down. Carry on.
  if (currentScrollY <= state.height && scrollDown && state.state === 'unfixed')
    return null

  // - Scrolling down
  // - Current scroll position is past the header
  // - Scrolled long enough to trigger an `unpin`
  // - Header is not already `unpinned`
  if (
    scrollDown &&
    currentScrollY > state.height &&
    distanceScrolled > props.unpinScrollThreshold &&
    state.state !== 'unpinned'
  )
    return 'unpin'

  // - Scrolling up
  // - Scrolled long enough to trigger a `pin`
  // - Header is `unpinned`
  if (
    scrollUp &&
    distanceScrolled > props.pinScrollThreshold &&
    state.state === 'unpinned'
  )
    return 'pin'

  // - Scrolling up
  // - Current scroll position is inside the header
  //   (trigger a `pin` regardless of `pinScrollThreshold`
  //   as the user has scrolled to a position of less than the
  //   header's height)
  // - Header is `unpinned`
  if (scrollUp && currentScrollY <= state.height && state.state === 'unpinned')
    return 'pin'

  return null
}
