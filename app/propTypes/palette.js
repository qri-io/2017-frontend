import { PropTypes } from 'react'

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
  background: '#0E2630',
  text: '#FFFFFF',
  path: '#D8D8D8',
  a: '#50C9F4',
  b: '#F8AC31',
  c: '#B0D248',
  d: '#ED3259',
  e: '#964C9D'
}
