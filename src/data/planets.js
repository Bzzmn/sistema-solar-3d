const mercuryTexture = '/textures/planets/8k_mercury.jpg'
const venusTexture = '/textures/planets/8k_venus_surface.jpg'
const earthTexture = '/textures/planets/8k_earth_daymap.jpg'
const marsTexture = '/textures/planets/8k_mars.jpg'
const jupiterTexture = '/textures/planets/8k_jupiter.jpg'
const saturnTexture = '/textures/planets/8k_saturn.jpg'
const uranusTexture = '/textures/planets/2k_uranus.jpg'
const neptuneTexture = '/textures/planets/2k_neptune.jpg'

const distnace_factor = 3


export const planets = [
    { 
      name: 'Mercury', 
      radius: 0.38, 
      distance: 10, 
      speed: 0.015, 
      color: 0x808080, 
      texture: mercuryTexture, 
      moons: [] 
    },
    { 
      name: 'Venus', 
      radius: 0.95, 
      distance: 15 * distnace_factor, 
      speed: 0.012, 
      color: 0xffa500, 
      texture: venusTexture, 
      moons: [] 
    },
    { 
      name: 'Earth', 
      radius: 1, 
      distance: 20 * distnace_factor, 
      speed: 0.01, 
      texture: earthTexture, 
      moons: [{ 
        name: 'Moon', 
        radius: 0.27, 
        distance: 1.5, // Ajustado
        speed: 0.05, 
        color: 0x808080 
      }] 
    },
    { 
      name: 'Mars', 
      radius: 0.53, 
      distance: 25 * distnace_factor, 
      speed: 0.008, 
      texture: marsTexture, 
      moons: [{ 
        name: 'Phobos', 
        radius: 0.003, 
        distance: 0.6, // Ajustado
        speed: 0.02, 
        color: 0x808080 
      }, { 
        name: 'Deimos', 
        radius: 0.002, 
        distance: 0.7, // Ajustado
        speed: 0.015, 
        color: 0x808080 
      }] 
    },
    { 
      name: 'Jupiter', 
      radius: 3.5, 
      distance: 55 * distnace_factor, 
      speed: 0.005, 
      texture: jupiterTexture, 
      moons: [{ 
        name: 'Io', 
        radius: 0.09, 
        distance: 4, // Ajustado
        speed: 0.03, 
        color: 0x808080 
      }, { 
        name: 'Europa', 
        radius: 0.08, 
        distance: 4.5, // Ajustado
        speed: 0.025, 
        color: 0x808080 
      }] 
    },
    { 
      name: 'Saturn', 
      radius: 3, 
      distance: 85 * distnace_factor, 
      speed: 0.004, 
      texture: saturnTexture, 
      moons: [{ 
        name: 'Titan', 
        radius: 0.12, 
        distance: 3.5, // Ajustado
        speed: 0.025, 
        color: 0x808080 
      }, { 
        name: 'Rhea', 
        radius: 0.05, 
        distance: 4, // Ajustado
        speed: 0.02, 
        color: 0x808080 
      }] 
    },
    { 
      name: 'Uranus', 
      radius: 2.5, 
      distance: 160 * distnace_factor, 
      speed: 0.003, 
      texture: uranusTexture, 
      moons: [{ 
        name: 'Titania', 
        radius: 0.04, 
        distance: 3, // Ajustado
        speed: 0.02, 
        color: 0x808080 
      }, { 
        name: 'Oberon', 
        radius: 0.04, 
        distance: 3.5, // Ajustado
        speed: 0.018, 
        color: 0x808080 
      }] 
    },
    { 
      name: 'Neptune', 
      radius: 2.4, 
      distance: 240 * distnace_factor, 
      speed: 0.002, 
      texture: neptuneTexture, 
      moons: [{ 
        name: 'Triton', 
        radius: 0.05, 
        distance: 2.9, // Ajustado
        speed: 0.015, 
        color: 0x808080 
      }, { 
        name: 'Nereid', 
        radius: 0.02, 
        distance: 3.4, // Ajustado
        speed: 0.012, 
        color: 0x808080 
      }] 
    }
  ]