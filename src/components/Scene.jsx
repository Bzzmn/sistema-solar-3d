import { useRef, useEffect, useCallback } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { CubeTextureLoader } from 'three'
import gsap from 'gsap'
import { planets } from '../data/planets'
import Planet from './Planet'
import PropTypes from 'prop-types'

function Scene({ onPlanetSelect }) {
  const sunRef = useRef()
  const followingRef = useRef(null)
  const controlsRef = useRef()
  const { camera, scene } = useThree()
  
  const sunTexture = useTexture('/textures/planets/8k_sun.jpg')
  const [cubeMap] = useLoader(CubeTextureLoader, [[
    '/textures/planets/cubemap/Standard-Cube-Map/px.png',
    '/textures/planets/cubemap/Standard-Cube-Map/nx.png',
    '/textures/planets/cubemap/Standard-Cube-Map/py.png',
    '/textures/planets/cubemap/Standard-Cube-Map/ny.png',
    '/textures/planets/cubemap/Standard-Cube-Map/pz.png',
    '/textures/planets/cubemap/Standard-Cube-Map/nz.png'
  ]])

  useFrame(() => {
    // Rotación del sol
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }

    // Seguimiento del planeta
    if (followingRef.current) {
      const planet = planets.find(p => p.name === followingRef.current);
      if (planet) {
        const targetObject = scene.getObjectByName(followingRef.current);
        if (targetObject) {
          const angle = targetObject.rotation.y;
          const planetX = Math.cos(angle) * planet.distance;
          const planetZ = Math.sin(angle) * planet.distance;

          // Mantener la cámara en una posición fija relativa al planeta
          const distanceFromPlanet = planet.radius * 20;
          const cameraOffset = distanceFromPlanet * 0.3;
          // const heightFactor = planet.radius * 8;

          camera.position.x = planetX + (planetX / planet.distance) * cameraOffset;
          camera.position.y = 0;
          camera.position.z = planetZ + (planetZ / planet.distance) * cameraOffset;

          camera.lookAt(planetX, 0, planetZ);

          if (controlsRef.current) {
            controlsRef.current.target.set(planetX, 0, planetZ);
            controlsRef.current.update();
          }
        }
      }
    }
  });

  const goToPlanet = useCallback((planetName) => {
    let targetObject = scene.getObjectByName(planetName);
    if (!targetObject) return;

    if (planetName === 'Sun') {
      console.log('moving to sun')
      followingRef.current = null;
      gsap.to(camera.position, {
        duration: 1.5,
        x: 0,
        y: 10,
        z: 30,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
          controlsRef.current?.target.set(0, 0, 0);
          controlsRef.current?.update();
        }
      });
      onPlanetSelect('Sun');
      return;
    }

    const planet = planets.find(p => p.name === planetName);
    if (!planet) return;

    const angle = targetObject.rotation.y;
    const planetX = Math.cos(angle) * planet.distance;
    const planetZ = Math.sin(angle) * planet.distance;

    const distanceFromPlanet = planet.radius * 20;
    const cameraOffset = distanceFromPlanet * 0.8;
    const heightFactor = planet.radius * 3;

    const finalCameraX = planetX + (planetX / planet.distance) * cameraOffset;
    const finalCameraY = heightFactor;
    const finalCameraZ = planetZ + (planetZ / planet.distance) * cameraOffset;

    gsap.to(camera.position, {
      duration: 1.5,
      x: finalCameraX,
      y: finalCameraY,
      z: finalCameraZ,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(planetX, 0, planetZ),
      onComplete: () => {
        followingRef.current = planetName;
      }
    });

    onPlanetSelect(planetName);
  }, [camera, scene, controlsRef, onPlanetSelect]);

  useEffect(() => {
    const handlePlanetClick = (event) => {
      const planetName = event.target.dataset.planet;
      if (planetName) goToPlanet(planetName);
    };

    document.querySelectorAll('.planet-btn').forEach(btn => {
      btn.addEventListener('click', handlePlanetClick);
    });

    return () => {
      document.querySelectorAll('.planet-btn').forEach(btn => {
        btn.removeEventListener('click', handlePlanetClick);
      });
    };
  }, [camera, scene, goToPlanet]);

  return (
    <>
      {/* eslint-disable react/no-unknown-property */}
      <color attach="background" args={['#000']} />
      <primitive object={cubeMap} attach="background" />
      
      {/* Luz del sol */}
      <pointLight position={[0, 0, 0]} intensity={7000} />
      
      {/* Luz ambiental principal */}
      <ambientLight intensity={0.3} />
      
      {/* Luz hemisférica para mejor iluminación global */}
      <hemisphereLight 
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={3}
        position={[0, 50, 0]}
      />
      
      {/* Luz direccional suave para sombras sutiles */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.2}
        color="#ffffff"
      />
      
      <OrbitControls 
        ref={controlsRef}
        enableDamping 
        dampingFactor={0.25}
        maxDistance={300}
        minDistance={5}
        minPolarAngle={Math.PI * 0.1}  // Allow more vertical movement
        maxPolarAngle={Math.PI * 0.8}  // Allow more vertical movement
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        enableRotate={true}
        rotateSpeed={0.5}
        target={[0, 0, 0]}
      />
      
      <mesh 
        ref={sunRef} 
        scale={4} 
        name="Sun" 
        position={[0, 0, 0]} 
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          map={sunTexture}
          emissive="#000000"
          emissiveIntensity={1}
          color="#ffffff"
        />
      </mesh>

      {planets.map((planet) => (
        <Planet 
          key={planet.name}
          planetData={planet}
        />
      ))}
      {/* eslint-enable react/no-unknown-property */}
    </>
  );
}

Scene.propTypes = {
  onPlanetSelect: PropTypes.func.isRequired
};

export default Scene; 