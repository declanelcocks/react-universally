import { reversePalette } from 'styled-theme/composer'

const theme = {}

// Generated using coolors.co
// +8
// +5
// +3
// middle
// -3
// -7
// -9
theme.palette = {
  primary: [
    '#07213a',
    '#0e4173',
    '#135699',
    '#1976d2',
    '#579bde',
    '#abcdee',
    '#d5e6f6',
  ],
  secondary: [
    '#350719',
    '#6a0e32',
    '#8e1243',
    '#c2185b',
    '#d25787',
    '#e8abc3',
    '#f3d5e1',
  ],
  danger: [
    '#3a0d0d',
    '#741a1a',
    '#9a2323',
    '#d32f2f',
    '#df6767',
    '#efb3b3',
    '#f7d9d9',
  ],
  alert: [
    '#462c00',
    '#8c5800',
    '#ba7500',
    '#ffa000',
    '#ffb945',
    '#ffdca2',
    '#ffedd0',
  ],
  success: [
    '#102711',
    '#1f4e21',
    '#29682c',
    '#388e3c',
    '#6ea271',
    '#b6d5b8',
    '#daeadb',
  ],
  white: ['#fff', '#fff', '#eee'],
  grayscale: [
    '#212121',
    '#414141',
    '#616161',
    '#9e9e9e',
    '#bdbdbd',
    '#e0e0e0',
    '#eeeeee',
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
