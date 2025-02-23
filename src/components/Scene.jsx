import { useRef, useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { CubeTextureLoader, Vector3 } from 'three'
import gsap from 'gsap'
import { planets } from '../data/planets'
import Planet from './Planet'

function Scene() {
  const sunRef = useRef()
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

  useEffect(() => {
    const goToPlanet = (planetName) => {
      let targetObject = scene.getObjectByName(planetName);
      if (!targetObject) return;
      const worldPosition = new Vector3();
      targetObject.getWorldPosition(worldPosition);
      const distance = planetName === 'Sun' ? 15 : targetObject.scale.x * 10;
      gsap.to(camera.position, {
        duration: 1.5,
        x: worldPosition.x,
        y: distance * 0.5,
        z: worldPosition.z + distance,
        ease: "power2.inOut",
        onUpdate: () => camera.lookAt(worldPosition)
      });
    };

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
  }, [camera, scene]);

  return (
    <>
      {/* eslint-disable react/no-unknown-property */}
      <color attach="background" args={['#000']} />
      <primitive object={cubeMap} attach="background" />
      
      <pointLight position={[0, 0, 0]} intensity={10000} />
      <ambientLight intensity={1.5} />
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.25}
        maxDistance={300}
        minDistance={5}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        enableRotate={true}
        rotateSpeed={0.5}
      />
      
      <mesh ref={sunRef} scale={5} name="Sun" position={[0, 0, 0]} >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
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

export default Scene; 