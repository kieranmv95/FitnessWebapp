import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IFormType = 'Time' | 'DistanceAndTime' | 'Reps' | 'WeightAndReps'

export type IEquipment =
  | 'Barbell'
  | 'Dumbbell'
  | 'Bodyweight'
  | 'Assisted Bodyweight'
  | 'Cable'
  | 'Machine'
  | 'Kettlebell'
  | 'Ball'
  | 'Battle Rope'
  | 'Skipping Rope'
  | 'Band'
  | 'Smith Machine'

// New form, time only
export type IMuscleGroup =
  | 'Chest'
  | 'Forearms'
  | 'Lats'
  | 'Middle Back'
  | 'Lower Back'
  | 'Neck'
  | 'Quadriceps'
  | 'Hamstrings'
  | 'Calves'
  | 'Triceps'
  | 'Traps'
  | 'Shoulders'
  | 'Abdominals'
  | 'Glutes'
  | 'Biceps'
  | 'Adductors'
  | 'Abductors'
  | 'Full Body'

export type IExerciseType = 'Strength' | 'Cardio'

export type IExercise = {
  id: string
  name: string
  muscleGroup: IMuscleGroup
  equipment: IEquipment
  type: IExerciseType
  form: IFormType
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
