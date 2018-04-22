import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'react-router-dom/Link'
import { font, palette } from 'styled-theme'
import { ifProp, switchProp, prop } from 'styled-tools'

const backgroundColor = ({ transparent }) =>
  transparent ? 'transparent' : palette(3)

const foregroundColor = ({ transparent, disabled }) =>
  transparent
    ? palette(disabled ? 5 : 3)
    : switchProp(prop('palette', palette('grayscale', 0, true)), {
        primary: palette('grayscale', 0, true),
        secondary: palette('accent', 3),
        accent: palette('secondary', 3),
      })

const hoverBackgroundColor = ({ disabled, transparent }) =>
  !disabled &&
  !transparent &&
  switchProp(prop('palette', palette(2)), {
    primary: palette(2),
    secondary: palette(4),
    accent: palette(2),
  })
const hoverForegroundColor = ({ disabled, transparent }) =>
  !disabled && transparent && palette(2)

const styles = css`
  display: block;
  font-family: ${font('primary')};
  font-size: 1rem;
  font-weight: 700;
  line-height: ${ifProp('small', '1rem', '1.5rem')};
  border: 0.0625rem solid
    ${ifProp('transparent', 'currentcolor', 'transparent')};
  padding: ${ifProp(
      'small',
      'calc(0.25rem - 0.0625rem)',
      'calc(0.5rem - 0.0625rem)',
    )}
    ${ifProp('small', '0.5rem', '1rem')};
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  text-decoration: none;
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  box-sizing: border-box;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  transition: all 0.15s ease;
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  ${ifProp(
    'disabled',
    css`
      opacity: 0.65;
    `,
  )};

  &:hover,
  &:focus,
  &:active {
    background-color: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }
`

const StyledLink = styled(
  ({ disabled, transparent, reverse, palette, theme, ...props }) => (
    <Link {...props} />
  ),
)`
  ${styles};
`
const Anchor = styled.a`
  ${styles};
`
const StyledButton = styled.button`
  ${styles};
`

const Button = ({ type, ...props }) => {
  if (props.to) {
    return <StyledLink {...props} />
  } else if (props.href) {
    return <Anchor {...props} />
  }
  return <StyledButton {...props} type={type} />
}

Button.propTypes = {
  disabled: PropTypes.bool,
  palette: PropTypes.string,
  transparent: PropTypes.bool,
  reverse: PropTypes.bool,
  type: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
}

Button.defaultProps = {
  palette: 'secondary',
  type: 'button',
}

export default Button
