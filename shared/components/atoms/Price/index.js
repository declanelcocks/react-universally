import React from 'react'
import PropTypes from 'prop-types'

import P from '../P'

const Price = ({ amount }) => <P>${amount.toFixed(2)}</P>

Price.propTypes = {
  amount: PropTypes.number.isRequired,
}

export default Price
