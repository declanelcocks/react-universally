import React from 'react'
import Link from 'react-router-dom/Link'
import styled from 'styled-components'

const List = styled.ul`
  margin: 1.5rem 0;
  padding: 0.75rem;
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
