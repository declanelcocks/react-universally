import { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 16px;
    line-height: 24px;
  }

  body {
    /*
      https://meowni.ca/font-style-matcher/

      Styles created using the above tool to try and ensure the FOUT
      (flash of unstyled text) doesn't look drastically different. This
      will try to ensure that when "Lato" is downloaded, it doesn't look
      too different to "sans-serif" and, more importantly, doesn't affect
      the layout of the page too much.
    */
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: -0.1px;
    word-spacing: -0.1px;

    &.fontloaded {
      font-family: 'Lato';
      font-size: 1rem;
      line-height: 1.5rem;
      letter-spacing: 0px;
      word-spacing: 0px;
    }
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
