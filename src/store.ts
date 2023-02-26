import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import exercisesReducer from '@/slice/exercisesSlice'
import filtersReducer from '@/slice/filterSlice'
import workoutReducer from '@/slice/workoutSlice'

const rootReducer = combineReducers({
  exercises: exercisesReducer,
  filters: filtersReducer,
  workout: workoutReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
