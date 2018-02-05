import { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Inline our ul for our menu */
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  ul li {
    display: inline;
    margin: 0 .5rem;
  }
`
