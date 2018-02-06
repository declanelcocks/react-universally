import React from 'react'
import Link from 'react-router-dom/Link'
import styled from 'styled-components'

const List = styled.ul`
  margin-top: 0.875rem;
  padding: 0.875rem;
  background-color: #c6c6c6;
`

function Menu() {
  return (
    <List>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/counter">Counter</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </List>
  )
}

export default Menu
