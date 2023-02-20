import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ICategory =
  | 'Barbell'
  | 'Dumbbell'
  | 'Bodyweight'
  | 'Cardio'
  | 'Cable'
  | 'Machine'
  | 'Kettlebell'
  | 'Duration'
  | 'Reps'

export type IMuscleGroup =
  | 'Arms'
  | 'Back'
  | 'Chest'
  | 'Core'
  | 'Legs'
  | 'Shoulders'
  | 'Olympic'
  | 'Full Body'
  | 'Cardio'

export type IExercise = {
  id: string
  name: string
  muscleGroup: IMuscleGroup
  category: ICategory
}

export type IExerciseState = {
  loading: boolean
  data: IExercise[]
  error: string
}

const initialState: IExerciseState = {
  loading: false,
  data: [],
  error: '',
}

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    fetchExercises: (_) => ({
      loading: true,
      data: [],
      error: '',
    }),
    fetchExercisesSuccess: (_, action: PayloadAction<IExercise[]>) => ({
      loading: false,
      data: action.payload,
      error: '',
    }),
    fetchExercisesFailure: (_, action: PayloadAction<string>) => ({
      loading: false,
      data: [],
      error: action.payload,
    }),
  },
})

const { actions, reducer } = exercisesSlice

export const { fetchExercises, fetchExercisesSuccess, fetchExercisesFailure } =
  actions

export default reducer
