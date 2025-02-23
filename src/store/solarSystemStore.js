import { create } from 'zustand'

const useSolarSystemStore = create((set) => ({
  isSystemPaused: false,
  lastClickedPlanet: null,
  planetsAngles: [],

  initializePlanets: (planetsCount) => set((state) => ({
    ...state,
    planetsAngles: Array(planetsCount).fill(0).map(() => Math.random() * Math.PI * 2),
    isSystemPaused: false
  }), true),

  updatePlanetAngle: (index, angle) => set((state) => ({
    ...state,
    planetsAngles: state.planetsAngles.map((a, i) => i === index ? angle : a)
  })),

  toggleSystemPause: () => set((state) => ({
    isSystemPaused: !state.isSystemPaused
  })),

  handlePlanetClick: (planetName) => set((state) => {
    if (planetName === 'Sun') {
      console.log('🌟 Viajando al Sol')
      return {
        ...state,
        isSystemPaused: false,
        lastClickedPlanet: null
      }
    }

    console.log(`🪐 Viajando a ${planetName}`)
    if (planetName === state.lastClickedPlanet) {
      return {
        ...state,
        isSystemPaused: !state.isSystemPaused,
        lastClickedPlanet: null
      }
    }

    return {
      ...state,
      isSystemPaused: true,
      lastClickedPlanet: planetName
    }
  })
}))

export default useSolarSystemStore 