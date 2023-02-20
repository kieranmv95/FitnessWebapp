import { combineReducers, configureStore } from '@reduxjs/toolkit'
import exercisesReducer from '@/slice/exercisesSlice'
import filtersReducer from '@/slice/filterSlice'
import modalReducer from '@/slice/modalSlice'
import type { PreloadedState } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  exercises: exercisesReducer,
  filters: filtersReducer,
  modal: modalReducer,
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
