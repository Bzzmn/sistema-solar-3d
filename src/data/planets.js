const mercuryTexture = '/textures/planets/8k_mercury.jpg'
const venusTexture = '/textures/planets/8k_venus_surface.jpg'
const earthTexture = '/textures/planets/8k_earth_daymap.jpg'
const marsTexture = '/textures/planets/8k_mars.jpg'
const jupiterTexture = '/textures/planets/8k_jupiter.jpg'
const saturnTexture = '/textures/planets/8k_saturn.jpg'
const uranusTexture = '/textures/planets/2k_uranus.jpg'
const neptuneTexture = '/textures/planets/2k_neptune.jpg'

const distance_factor = 3


export const planets = [
  { 
      name: 'Mercury', 
      radius: 0.38, 
      distance: 10, 
      speed: 0.015, 
      color: 0x808080, 
      texture: mercuryTexture, 
      moons: [],
      metadata: {
          atmosphere: "42% Oxygen, 29% Sodium, 22% Hydrogen, 7% Others",
          distanceFromSun: 57.9, // in million km
          rotationDuration: "58.6 Earth days",
          orbitDuration: "88 Earth days",
          numberOfMoons: 0,
          sizeComparedToEarth: "0.38x Earth diameter",
          temperatureDay: "430°C",
          temperatureNight: "-180°C"
      }
  },
  { 
      name: 'Venus', 
      radius: 0.95, 
      distance: 15 * distance_factor, 
      speed: 0.012, 
      color: 0xffa500, 
      texture: venusTexture, 
      moons: [],
      metadata: {
          atmosphere: "96% CO2, 3% Nitrogen, 1% Others",
          distanceFromSun: 108.2, // in million km
          rotationDuration: "243 Earth days (retrograde)",
          orbitDuration: "225 Earth days",
          numberOfMoons: 0,
          sizeComparedToEarth: "0.95x Earth diameter",
          temperatureDay: "462°C",
          temperatureNight: "462°C"
      }
  },
  { 
      name: 'Earth', 
      radius: 1, 
      distance: 20 * distance_factor, 
      speed: 0.01, 
      texture: earthTexture, 
      moons: [{ 
          name: 'Moon', 
          radius: 0.27, 
          distance: 1.5, 
          speed: 0.05, 
          color: 0x808080 
      }],
      metadata: {
          atmosphere: "78% Nitrogen, 21% Oxygen, 1% Others",
          distanceFromSun: 149.6, // in million km
          rotationDuration: "24 hours",
          orbitDuration: "365.25 days",
          numberOfMoons: 1,
          sizeComparedToEarth: "1.00x Earth diameter",
          temperatureDay: "15°C",
          temperatureNight: "10°C"
      }
  },
  { 
      name: 'Mars', 
      radius: 0.53, 
      distance: 25 * distance_factor, 
      speed: 0.008, 
      texture: marsTexture, 
      moons: [{ 
          name: 'Phobos', 
          radius: 0.003, 
          distance: 0.6, 
          speed: 0.02, 
          color: 0x808080 
      }, { 
          name: 'Deimos', 
          radius: 0.002, 
          distance: 0.7, 
          speed: 0.015, 
          color: 0x808080 
      }],
      metadata: {
          atmosphere: "95% CO2, 3% Nitrogen, 1.6% Argon",
          distanceFromSun: 227.9, // in million km
          rotationDuration: "24.6 hours",
          orbitDuration: "687 Earth days",
          numberOfMoons: 2,
          sizeComparedToEarth: "0.53x Earth diameter",
          temperatureDay: "-20°C",
          temperatureNight: "-73°C"
      }
  },
  { 
      name: 'Jupiter', 
      radius: 3.5, 
      distance: 55 * distance_factor, 
      speed: 0.005, 
      texture: jupiterTexture, 
      moons: [{ 
          name: 'Io', 
          radius: 0.09, 
          distance: 4, 
          speed: 0.03, 
          color: 0x808080 
      }, { 
          name: 'Europa', 
          radius: 0.08, 
          distance: 4.5, 
          speed: 0.025, 
          color: 0x808080 
      }],
      metadata: {
          atmosphere: "89% Hydrogen, 10% Helium, 1% Others",
          distanceFromSun: 778.5, // in million km
          rotationDuration: "9.9 hours",
          orbitDuration: "11.86 Earth years",
          numberOfMoons: 95,
          sizeComparedToEarth: "11.2x Earth diameter",
          temperatureDay: "-145°C",
          temperatureNight: "-145°C"
      }
  },
  { 
      name: 'Saturn', 
      radius: 3, 
      distance: 85 * distance_factor, 
      speed: 0.004, 
      texture: saturnTexture, 
      moons: [{ 
          name: 'Titan', 
          radius: 0.12, 
          distance: 3.5, 
          speed: 0.025, 
          color: 0x808080 
      }, { 
          name: 'Rhea', 
          radius: 0.05, 
          distance: 4, 
          speed: 0.02, 
          color: 0x808080 
      }],
      metadata: {
          atmosphere: "96% Hydrogen, 3% Helium, 1% Methane",
          distanceFromSun: 1433.5, // in million km
          rotationDuration: "10.7 hours",
          orbitDuration: "29.45 Earth years",
          numberOfMoons: 146,
          sizeComparedToEarth: "9.4x Earth diameter",
          temperatureDay: "-178°C",
          temperatureNight: "-178°C"
      }
  },
  { 
      name: 'Uranus', 
      radius: 2.5, 
      distance: 160 * distance_factor, 
      speed: 0.003, 
      texture: uranusTexture, 
      moons: [{ 
          name: 'Titania', 
          radius: 0.04, 
          distance: 3, 
          speed: 0.02, 
          color: 0x808080 
      }, { 
          name: 'Oberon', 
          radius: 0.04, 
          distance: 3.5, 
          speed: 0.018, 
          color: 0x808080 
      }],
      metadata: {
          atmosphere: "83% Hydrogen, 15% Helium, 2% Methane",
          distanceFromSun: 2872.5, // in million km
          rotationDuration: "17.2 hours",
          orbitDuration: "84 Earth years",
          numberOfMoons: 27,
          sizeComparedToEarth: "4.0x Earth diameter",
          temperatureDay: "-224°C",
          temperatureNight: "-224°C"
      }
  },
  { 
      name: 'Neptune', 
      radius: 2.4, 
      distance: 240 * distance_factor, 
      speed: 0.002, 
      texture: neptuneTexture, 
      moons: [{ 
          name: 'Triton', 
          radius: 0.05, 
          distance: 2.9, 
          speed: 0.015, 
          color: 0x808080 
      }, { 
          name: 'Nereid', 
          radius: 0.02, 
          distance: 3.4, 
          speed: 0.012, 
          color: 0x808080 
      }],
      metadata: {
          atmosphere: "80% Hydrogen, 19% Helium, 1% Methane",
          distanceFromSun: 4495.1, // in million km
          rotationDuration: "16.1 hours",
          orbitDuration: "164.8 Earth years",
          numberOfMoons: 14,
          sizeComparedToEarth: "3.9x Earth diameter",
          temperatureDay: "-218°C",
          temperatureNight: "-218°C"
      }
  }
];
