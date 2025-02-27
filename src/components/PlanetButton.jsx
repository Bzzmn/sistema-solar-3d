import PropTypes from 'prop-types';

const PlanetButton = ({ name, onClick }) => {
  return (
    <button 
      className="planet-btn" 
      data-planet={name}
      title={`Navigate to ${name}`}
      onClick={onClick}
    >
      {name.toLowerCase()}
    </button>
  );
};

PlanetButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PlanetButton; 