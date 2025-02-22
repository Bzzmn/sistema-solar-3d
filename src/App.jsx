import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import Loader from './components/Loader'
import { planets } from './data/planets'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTime = 6300 // 6.3 segundos
    
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Canvas
        camera={{
          position: [100, 30, 0],
          fov: 90,
          near: 0.1,
          far: 400
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true
        }}
      >
        <Scene />
      </Canvas>
      
      <div className="navigation">
        <button className="planet-btn" data-planet="Sun">Sun</button>
        {planets.map(planet => (
          <button 
            key={planet.name}
            className="planet-btn" 
            data-planet={planet.name}
          >
            {planet.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default App 