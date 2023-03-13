import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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

export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async () => {
    const response = await fetch(`https://fitness.neofytou.com/api/exercises`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
      },
    })
    return await response.json()
  },
)

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExercises.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchExercises.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.name,
        muscleGroup: item.attributes.muscleGroup,
        equipment: item.attributes.equipment,
        form: item.attributes.form,
        type: item.attributes.type,
      }))
      state.error = ''
    })
    builder.addCase(fetchExercises.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = 'failed to load exercises'
    })
  },
})

const { reducer } = exercisesSlice

export default reducer
