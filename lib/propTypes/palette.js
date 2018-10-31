import PropTypes from 'prop-types'

export const Palette = PropTypes.shape({
  background: PropTypes.text,
  sink: PropTypes.text,
  primary: PropTypes.text,
  primaryDark: PropTypes.text,
  primaryMuted: PropTypes.text,
  primaryLight: PropTypes.text,
  text: PropTypes.text,
  textMuted: PropTypes.text,
  textLight: PropTypes.text,
  error: PropTypes.text,
  connected: PropTypes.text,
  success: PropTypes.text
})

export const defaultPalette = {
  background: '#FFFFFF',
  sink: '#F6F6F8',
  primary: '#0061A6',
  primaryDark: '#004E86',
  primaryMuted: '#B3CFE4',
  primaryLight: '#F6F6F8',
  text: '#303030',
  textMuted: '#646464',
  textLight: '#C9C9C9',
  error: '#EB0000',
  connected: '#F8CD1C',
  success: '#B3CFE4'
}
