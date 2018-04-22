import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { switchProp, prop, ifProp } from 'styled-tools'

const singleCharStyle = css`
  ${({ children }) => {
    if (
      (children.props && children.props.icon) ||
      (typeof children === 'string' && children.length === 1)
    ) {
      return css`
        border-radius: 50%;
        padding: 0;
        ${switchProp(prop('size'), {
          small: css`
            height: 1.5rem;
            width: 1.5rem;
          `,
          medium: css`
            height: 2rem;
            width: 2rem;
          `,
          large: css`
            height: 3.5rem;
            width: 3.5rem;
          `,
        })};

        & > span {
          ${switchProp(prop('size'), {
            small: css`
              height: 0.875rem;
              width: 0.875rem;
            `,
            medium: css`
              height: 1.25rem;
              width: 1.25rem;
            `,
            large: css`
              height: 2.25rem;
              width: 2.25rem;
            `,
          })};
        }
      `
    }

    return null
  }};
`

const StyledDiv = styled.div`
  display: inline-flex;
  color: ${palette('white', 0)};
  background-color: ${ifProp({ palette: 'grayscale' }, palette(4), palette(3))};
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  font-size: ${switchProp(prop('size'), {
    small: '0.8125rem;',
    medium: '1rem',
    large: '2.5rem',
  })};
  line-height: ${switchProp(prop('size'), {
    small: '1.5rem',
    medium: '2rem',
    large: '4.5rem',
  })};

  ${singleCharStyle};
`
const Badge = ({ palette, circle, size, children, ...props }) => {
  return (
    <StyledDiv palette={palette} circle={circle} size={size} {...props}>
      {children}
    </StyledDiv>
  )
}

Badge.propTypes = {
  palette: PropTypes.string,
  circle: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children(props, propName, componentName) {
    const children = props[propName]

    if (!props.circle) {
      return null
    }

    if (React.Children.count(children) !== 1) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Please use one child only`,
      )
    }
    const isIcon = children.props && children.props.icon
    const isString = typeof children === 'string'
    if (!isIcon && !isString) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Please use Icon or String`,
      )
    } else if (isString && children.length > 1) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Please use a String with a maximum length of 1 character.`,
      )
    }

    return null
  },
}

Badge.defaultProps = {
  palette: 'primary',
  size: 'medium',
}

export default Badge
