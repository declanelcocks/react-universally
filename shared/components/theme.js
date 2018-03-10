import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: [
    '#092949',
    '#0e4377',
    '#145ca4',
    '#1976d2',
    '#378fe7',
    '#64a9ed',
    '#92c2f2',
  ],
  secondary: [
    '#3a071b',
    '#670d30',
    '#951246',
    '#c2185b',
    '#e42973',
    '#ea5690',
    '#f083ae',
  ],
  danger: [
    '#571212',
    '#811b1b',
    '#ab2424',
    '#d32f2f',
    '#dc5959',
    '#e58383',
    '#eeadad',
  ],
  alert: [
    '#664000',
    '#996000',
    '#cc8000',
    '#ffa000',
    '#ffb333',
    '#ffc666',
    '#ffd999',
  ],
  success: [
    '#0d200e',
    '#1b451d',
    '#2a692d',
    '#388e3c',
    '#46b34b',
    '#68c46d',
    '#8dd290',
  ],
  white: ['#fff', '#fff', '#eee'],
  grayscale: [
    '#212121',
    '#464646',
    '#6b6b6b',
    '#909090',
    '#b5b5b5',
    '#dadada',
    '#ffffff',
  ],
}

theme.reversePalette = reversePalette(theme.palette)

theme.fonts = {
  primary: 'Lato, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
}

theme.sizes = {
  maxWidth: '1100px',
}

export default theme
