import React from 'react'
import { Box } from 'grid-styled'

const convertColumnNumber = col => parseInt(col, 10) / 12

const convertComlumnArray = colArray => colArray.map(convertColumnNumber)

const Column = ({ columns, ...props }) => {
  const colArray = columns.split(' ')
  const isResponsive = colArray.length > 1
  return (
    <Box
      width={
        !isResponsive
          ? convertColumnNumber(columns)
          : convertComlumnArray(colArray)
      }
      {...props}
    />
  )
}

Column.propTypes = {
  // eslint-disable-next-line consistent-return
  columns(props, propName, componentName) {
    const columns = props[propName].split(' ')
    const isValid = num => parseInt(num, 10) >= 1 && parseInt(num, 10) <= 12
    const invalid = columns.some(col => !isValid(col))

    if (invalid)
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Please use numerical column values between 1 and 12.`,
      )
  },
}

Column.defaultProps = {
  columns: '12',
}

export default Column
