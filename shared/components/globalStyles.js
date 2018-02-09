import { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 16px;
    line-height: 24px;
  }

  body {
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  p, ul, ol, pre, table, blockquote {
    margin-top: 0rem;
    margin-bottom: 1.75rem;
  }

  ul ul, ol ol, ul ol, ol ul {
    margin-top: 0rem;
    margin-bottom: 0rem;
  }

  ul {
    list-style-type: none;

    li {
      display: inline;
      margin: 0 0.5rem;
    }
  }
`
