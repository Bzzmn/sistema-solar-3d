import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './PlanetInfo.css';

const PlanetInfo = ({ planetData }) => {
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 2000); // Typing animation duration

    return () => clearTimeout(timer);
  }, [planetData]);

  if (!planetData) return null;

  return (
    <div className="planet-info">
      <div className="planet-info-header">
        <h2>{"// " + planetData.name}</h2>
      </div>
      <div className={`planet-info-content ${isTyping ? 'typing' : ''}`}>
        <div className="info-item">
          <span className="info-label">- atmosphere </span>
          <span className="info-value">{planetData.metadata?.atmosphere}</span>
        </div>
        <div className="info-item">
          <span className="info-label">- distance from sun </span>
          <span className="info-value">{planetData.metadata?.distanceFromSun} million km</span>
        </div>
        <div className="info-item">
          <span className="info-label">- rotation duration </span>
          <span className="info-value">{planetData.metadata?.rotationDuration}</span>
        </div>
        <div className="info-item">
          <span className="info-label">- orbit duration </span>
          <span className="info-value">{planetData.metadata?.orbitDuration}</span>
        </div>
        <div className="info-item">
          <span className="info-label">- number of moons </span>
          <span className="info-value">{planetData.metadata?.numberOfMoons}</span>
        </div>
        <div className="info-item">
          <span className="info-label">- size compared to earth </span>
          <span className="info-value">{planetData.metadata?.sizeComparedToEarth}</span>
        </div>
        <div className="info-item">
          <span className="info-label">- temperature </span>
          <span className="info-value">day: {planetData.metadata?.temperatureDay} / night: {planetData.metadata?.temperatureNight}</span>
        </div>
      </div>
    </div>
  );
};

PlanetInfo.propTypes = {
  planetData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      atmosphere: PropTypes.string,
      distanceFromSun: PropTypes.number,
      rotationDuration: PropTypes.string,
      orbitDuration: PropTypes.string,
      numberOfMoons: PropTypes.number,
      sizeComparedToEarth: PropTypes.string,
      temperatureDay: PropTypes.string,
      temperatureNight: PropTypes.string,
    }),
  }),
};

export default PlanetInfo; 