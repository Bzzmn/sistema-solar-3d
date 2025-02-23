import { createSlice } from '@reduxjs/toolkit'

const planetsSlice = createSlice({
  name: 'planets',
  initialState: {
    isPaused: false
  },
  reducers: {
    setPlanetsMovement: (state, action) => {
      state.isPaused = action.payload
    }
  }
})

export const { setPlanetsMovement } = planetsSlice.actions
export default planetsSlice.reducer 