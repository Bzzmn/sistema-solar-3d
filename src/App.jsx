import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Loader from './components/Loader'
import PlanetNavigation from './components/PlanetNavigation'
import PlanetInfo from './components/PlanetInfo'
import { planets } from './data/planets'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [showHelp, setShowHelp] = useState(true)

  useEffect(() => {
    const loadingTime = 6300 // 6.3 segundos
    
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Hide the help text after 5 seconds
    const timer = setTimeout(() => {
      setShowHelp(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handlePlanetSelect = (planetName) => {
    if (planetName === 'Sun') {
      setSelectedPlanet({
        name: 'Sun',
        metadata: {
          atmosphere: "75% Hydrogen, 25% Helium",
          distanceFromSun: 0,
          rotationDuration: "27 Earth days",
          orbitDuration: "N/A",
          numberOfMoons: 0,
          sizeComparedToEarth: "109x Earth diameter",
          temperatureDay: "5,500°C",
          temperatureNight: "5,500°C"
        }
      });
    } else {
      const planet = planets.find(p => p.name === planetName);
      setSelectedPlanet(planet);
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Canvas
        camera={{
          position: [100, 30, 0],
          fov: 45,
          near: 0.1,
          far: 600
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true
        }}
      >
        <Scene onPlanetSelect={handlePlanetSelect} />
      </Canvas>
      <PlanetInfo planetData={selectedPlanet} />
      <PlanetNavigation planets={planets} onPlanetSelect={handlePlanetSelect} />
      {showHelp && (
        <div className="interaction-help">
          Use the navigation panel to explore planets
        </div>
      )}
    </>
  )
}

export default App 