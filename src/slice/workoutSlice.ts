import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IExercise } from '@/slice/exercisesSlice'

type IWorkoutExercise = IExercise & {
  sets: any[]
}

export type IWorkout = {
  name: string
  folder: string
  exercises: IWorkoutExercise[]
}

type IWorkoutState = {
  loading: boolean
  error: string
  data: IWorkout | null
}

const initialState: IWorkoutState = {
  loading: false,
  error: '',
  data: null,
}

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    fetchWorkout: (_) => ({
      loading: true,
      error: '',
      data: null,
    }),
    fetchWorkoutSuccess: (_, action: PayloadAction<IWorkout>) => ({
      loading: false,
      error: '',
      data: action.payload,
    }),
    fetchWorkoutFailure: (_, action: PayloadAction<string>) => ({
      loading: false,
      error: action.payload,
      data: null,
    }),
    clearWorkout: (_) => ({
      loading: false,
      error: '',
      data: null,
    }),
  },
})

const { actions, reducer } = workoutSlice

export const {
  fetchWorkout,
  fetchWorkoutSuccess,
  fetchWorkoutFailure,
  clearWorkout,
} = actions

export default reducer
