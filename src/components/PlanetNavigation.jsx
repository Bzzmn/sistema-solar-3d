import PropTypes from 'prop-types';
import PlanetButton from './PlanetButton';
import './PlanetNavigation.css';

const PlanetNavigation = ({ planets, onPlanetSelect }) => {
  return (
    <nav className="planet-navigation">
      <div className="planet-navigation-container">
        <PlanetButton 
          name="Sun" 
          onClick={() => onPlanetSelect('Sun')}
        />
        {planets.map(planet => (
          <PlanetButton 
            key={planet.name}
            name={planet.name}
            onClick={() => onPlanetSelect(planet.name)}
          />
        ))}
      </div>
    </nav>
  );
};

PlanetNavigation.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onPlanetSelect: PropTypes.func.isRequired
};

export default PlanetNavigation; 