import { useRef, useEffect, useCallback, useState } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { CubeTextureLoader } from 'three'
import gsap from 'gsap'
import { planets } from '../data/planets'
import Planet from './Planet'

function Scene() {
  const sunRef = useRef()
  const planetsRef = useRef([])
  const controlsRef = useRef()
  const { camera } = useThree()
  
  const sunTexture = useTexture('/textures/planets/8k_sun.jpg')
  const [cubeMap] = useLoader(CubeTextureLoader, [[
    '/textures/planets/cubemap/Standard-Cube-Map/px.png',
    '/textures/planets/cubemap/Standard-Cube-Map/nx.png',
    '/textures/planets/cubemap/Standard-Cube-Map/py.png',
    '/textures/planets/cubemap/Standard-Cube-Map/ny.png',
    '/textures/planets/cubemap/Standard-Cube-Map/pz.png',
    '/textures/planets/cubemap/Standard-Cube-Map/nz.png'
  ]])

  // Agregar estado para controlar la animación inicial
  const [isInitialAnimation, setIsInitialAnimation] = useState(true)
  const initialAngle = useRef(0)

  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const interactionTimer = useRef(null)
  const lastCameraPosition = useRef({
    radius: 50,
    height: 20,
    angle: 0
  })
  
  const [isReturningToInitial, setIsReturningToInitial] = useState(false)
  const initialPosition = { x: 50, y: 20, z: 0 }

  // Función para manejar el fin de la interacción
  const handleInteractionEnd = useCallback(() => {
    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current)
    }
    
    interactionTimer.current = setTimeout(() => {
      setIsUserInteracting(false)
    }, 5000) // 5 segundos
  }, [])

  // Modificar useFrame para incluir la condición de interacción
  useFrame(() => {
    if (!isUserInteracting) {
      // Rotación automática desde la última posición conocida
      initialAngle.current -= 0.0005
      const radius = lastCameraPosition.current.radius // Usar el radio actual
      const height = lastCameraPosition.current.height // Mantener la altura actual
      camera.position.x = Math.cos(initialAngle.current) * radius
      camera.position.z = Math.sin(initialAngle.current) * radius
      camera.position.y = height
      camera.lookAt(0, 0, 0)
    } else {
      // Actualizar la última posición conocida
      lastCameraPosition.current = {
        radius: Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2), // Radio en el plano XZ
        height: camera.position.y,
        angle: Math.atan2(camera.position.z, camera.position.x)
      }
      initialAngle.current = lastCameraPosition.current.angle
    }

    if (sunRef.current) {
      sunRef.current.rotation.y += 0.0005;
    }

    planetsRef.current.forEach((planet, index) => {
      if (planet) {
        planet.rotation.y += 0.1 * planets[index].speed;
        planet.position.x = Math.cos(planet.rotation.y) * planets[index].distance;
        planet.position.z = Math.sin(planet.rotation.y) * planets[index].distance;

        // Animar lunas
        planet.children.forEach((moon, moonIndex) => {
          moon.rotation.y += 0.1 * planets[index].moons[moonIndex].speed;
          moon.position.x = Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
          moon.position.z = Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
        });
      }
    });
  });

  const goToPlanet = useCallback((planetName) => {
    let targetObject;
    let distance;

    if (planetName === 'Sun') {
      targetObject = sunRef.current;
      distance = 15;
    } else {
      const planetIndex = planets.findIndex(p => p.name === planetName);
      targetObject = planetsRef.current[planetIndex];
      distance = planets[planetIndex].radius * 5;
    }

    const position = targetObject.position.clone();

    gsap.to(camera.position, {
      duration: 2,
      x: position.x + distance,
      y: distance * 0.5,
      z: position.z + distance,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(position);
        controlsRef.current?.update();
      }
    });
  }, [camera]);

  useEffect(() => {
    const handlePlanetClick = (event) => {
      const planetName = event.target.dataset.planet;
      if (planetName) {
        goToPlanet(planetName);
      }
    };

    document.querySelectorAll('.planet-btn').forEach(btn => {
      btn.addEventListener('click', handlePlanetClick);
    });

    return () => {
      document.querySelectorAll('.planet-btn').forEach(btn => {
        btn.removeEventListener('click', handlePlanetClick);
      });
    };
  }, [goToPlanet]);

  return (
    <>
      {/* eslint-disable react/no-unknown-property */}
      <color attach="background" args={['#000']} />
      <primitive object={cubeMap} attach="background" />
      
      <pointLight position={[0, 0, 0]} intensity={5000} />
      <ambientLight intensity={0.2} />
      
      <OrbitControls 
        ref={controlsRef}
        enableDamping 
        dampingFactor={0.25}
        maxDistance={170}     // Distancia máxima de zoom out
        minDistance={10}      // Distancia mínima de zoom in
        minPolarAngle={Math.PI * 0.4}  // Límite superior (aprox. 36 grados desde arriba)
        maxPolarAngle={Math.PI * 0.6}  // Límite inferior (aprox. 144 grados desde arriba)
        enableZoom
        enableRotate
        enablePan
        zoomSpeed={1}
        rotateSpeed={0.5}
        onStart={() => {
          setIsUserInteracting(true)
          if (interactionTimer.current) {
            clearTimeout(interactionTimer.current)
          }
        }}
        onChange={() => {
          if (interactionTimer.current) {
            clearTimeout(interactionTimer.current)
          }
          interactionTimer.current = setTimeout(() => {
            setIsUserInteracting(false)
          }, 5000)
        }}
      />
      
      <mesh ref={sunRef} scale={5} name="Sun">
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>

      {planets.map((planet, index) => (
        <Planet 
          key={planet.name}
          ref={el => planetsRef.current[index] = el}
          planetData={planet}
        />
      ))}
      {/* eslint-enable react/no-unknown-property */}
    </>
  );
}

export default Scene; 