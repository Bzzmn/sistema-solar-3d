import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import PropTypes from 'prop-types'

/* eslint-disable react/no-unknown-property */
function Planet({ planetData }) {
  const planetRef = useRef()
  
  // Cargar texturas con optimizaciones
  const planetTexture = useTexture(planetData.texture, (texture) => {
    texture.generateMipmaps = true
  })
  
  const moonTexture = useTexture('/textures/planets/8k_moon.jpg', (texture) => {
    texture.generateMipmaps = true
  })
  
  // Posición inicial aleatoria en la órbita
  useEffect(() => {
    if (planetRef.current) {
      const randomAngle = Math.random() * Math.PI * 2
      planetRef.current.rotation.y = randomAngle
      planetRef.current.position.x = Math.cos(randomAngle) * planetData.distance
      planetRef.current.position.z = Math.sin(randomAngle) * planetData.distance
    }
  }, [planetData.distance])

  useFrame(() => {
    if (planetRef.current) {
      // Rotación del planeta
      planetRef.current.rotation.y += 0.1 * planetData.speed
      
      // Órbita
      const angle = planetRef.current.rotation.y
      planetRef.current.position.x = Math.cos(angle) * planetData.distance
      planetRef.current.position.z = Math.sin(angle) * planetData.distance
    }
  })

  return (
    <group ref={planetRef}>
      {/* Planeta */}
      <mesh 
        scale={planetData.radius}
        name={planetData.name}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          map={planetTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Lunas */}
      {planetData.moons?.map((moon) => (
        <Moon 
          key={moon.name}
          moonData={moon}
          moonTexture={moonTexture}
        />
      ))}
    </group>
  )
}

Planet.propTypes = {
  planetData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    texture: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    moons: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      radius: PropTypes.number.isRequired,
      distance: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      color: PropTypes.string
    })).isRequired
  }).isRequired
}

function Moon({ moonData, moonTexture }) {
  const moonRef = useRef()
  
  // Posición inicial aleatoria para las lunas
  useEffect(() => {
    if (moonRef.current) {
      const randomAngle = Math.random() * Math.PI * 2
      moonRef.current.rotation.y = randomAngle
      moonRef.current.position.x = Math.cos(randomAngle) * moonData.distance
      moonRef.current.position.z = Math.sin(randomAngle) * moonData.distance
    }
  }, [moonData.distance])

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.1 * moonData.speed
      moonRef.current.position.x = Math.cos(moonRef.current.rotation.y) * moonData.distance
      moonRef.current.position.z = Math.sin(moonRef.current.rotation.y) * moonData.distance
    }
  })

  return (
    <mesh ref={moonRef} scale={moonData.radius}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        map={moonTexture}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

Moon.propTypes = {
  moonData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    color: PropTypes.string
  }).isRequired,
  moonTexture: PropTypes.object.isRequired
}

export default Planet 