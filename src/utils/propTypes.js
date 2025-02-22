import PropTypes from 'prop-types'

export const ThreeElements = {
  position: PropTypes.arrayOf(PropTypes.number),
  intensity: PropTypes.number,
  args: PropTypes.arrayOf(PropTypes.number),
  map: PropTypes.object
} 