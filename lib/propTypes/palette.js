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
  background: '#C3C3C3',
  sink: '#FFFFFF',
  text: '#243239',
  path: '#D8D8D8',
  muted: '#395A67',
  error: '#C40000',
  a: '#50C9F4',
  b: '#DE9A2C',
  c: '#B0D248',
  d: '#ED3259',
  e: '#964C9D',
  f: '#F05631',
  gray: '#545454',
  lightGray: '#9B9B9B',
  overlay: 'rgba(0,0,0,0.25)',
  hover: '#9FFFF0'
}
