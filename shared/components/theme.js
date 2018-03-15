import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: [
    '#03217d',
    '#042eaf',
    '#053be1',
    '#1f55fa',
    '#517bfb',
    '#83a1fc',
    '#b5c7fd',
  ],
  secondary: [
    '#8c1d84',
    '#b725ac',
    '#d639cb',
    '#df63d6',
    '#e88de1',
    '#f0b8ec',
    '#f9e2f7',
  ],
  red: [
    '#661a00',
    '#992700',
    '#cc3400',
    '#ff4100',
    '#ff6733',
    '#ff8d66',
    '#ffb399',
  ],
  yellow: [
    '#a16600',
    '#d48600',
    '#ffa408',
    '#ffb73b',
    '#ffca6e',
    '#ffdca1',
    '#ffefd4',
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
  maxWidth: '1100px',
}

export default theme
