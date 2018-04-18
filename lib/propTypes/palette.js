import PropTypes from 'prop-types'

export const Palette = PropTypes.shape({
  background: PropTypes.text,
  text: PropTypes.text,
  path: PropTypes.text,
  a: PropTypes.text,
  b: PropTypes.text,
  c: PropTypes.text,
  d: PropTypes.text,
  e: PropTypes.text
})

export const defaultPalette = {
  background: '#E6E6E6',
  sink: '#FFFFFF',
  text: '#243239',
  path: '#9B9B9B',
  muted: '#405966',
  success: '#7ED321',
  error: '#D00218',
  a: '#50C9F4',
  b: '#F8AC31',
  c: '#B0D248',
  d: '#ED3259',
  e: '#964C9D',
  f: '#F05631',
  gray: '#9B9B9B',
  lightGray: '#C3C3C3',
  sidebar: '#9B9B9B',
  hover: '#9FFFF0'
}
