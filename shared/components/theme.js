import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: [
    '#002b62',
    '#004195',
    '#0058c8',
    '#006efb',
    '#2f8aff',
    '#62a7ff',
    '#95c3ff',
  ],
  secondary: [
    '#000000',
    '#01030e',
    '#060f3c',
    '#0a1b6b',
    '#0e279a',
    '#1333c8',
    '#2446ea',
  ],
  accent: [
    '#10a360',
    '#15d17b',
    '#2fea94',
    '#5defac',
    '#8bf4c4',
    '#baf8dc',
    '#e8fdf3',
  ],
  red: [
    '#710909',
    '#a00d0d',
    '#cf1111',
    '#ed2626',
    '#f15555',
    '#f58484',
    '#f9b3b3',
  ],
  yellow: [
    '#ad6e00',
    '#e08e00',
    '#ffa914',
    '#ffbc47',
    '#ffcf7a',
    '#ffe1ad',
    '#fff4e0',
  ],
  green: [
    '#2f6912',
    '#42941a',
    '#56bf22',
    '#6edc38',
    '#8ee463',
    '#adeb8f',
    '#cdf3ba',
  ],
  white: ['#fff', '#f6f9fc'],
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
  maxWidth: '67.5em',
  mobile: '32em',
  tablet: '48em',
  desktop: '67.5em',
}

theme.breakpoints = [
  theme.sizes.mobile,
  theme.sizes.tablet,
  theme.sizes.desktop,
]

export default theme
