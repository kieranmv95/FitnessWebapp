import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IExercise } from '@/slice/exercisesSlice'

type IWorkoutExercise = IExercise & {
  sets: any[]
}

type IWorkout = {
  name: string
  folder: string
  exercises: IWorkoutExercise[]
}

const testWorkout: IWorkout = {
  name: 'Test Workout',
  folder: 'hypertrophy',
  exercises: [
    {
      id: '0987t6rdtxc23',
      name: 'Assisted Pullup',
      muscleGroup: 'Back',
      category: 'Assisted Bodyweight',
      sets: [
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
      ],
    },
    {
      id: 'u2398321gbh',
      name: 'Cycling',
      muscleGroup: 'Legs',
      category: 'Cardio',
      sets: [
        {
          distance: '',
          time: {
            hh: '',
            mm: '',
            ss: '',
          },
        },
        {
          distance: '',
          time: {
            hh: '',
            mm: '',
            ss: '',
          },
        },
      ],
    },
    {
      id: '0987t6rdtxc',
      name: 'Deadlift (Barbell)',
      muscleGroup: 'Legs',
      category: 'Barbell',
      sets: [
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
        {
          weight: '',
          reps: '',
        },
      ],
    },
  ],
}

type IWorkoutState = {
  loading: boolean
  error: string
  workout: IWorkout | null
}

const initialState: IWorkoutState = {
  loading: false,
  error: '',
  workout: null,
}

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    fetchWorkout: (_) => ({
      loading: true,
      error: '',
      workout: null,
    }),
    fetchWorkoutSuccess: (_, action: PayloadAction<IWorkout>) => ({
      loading: false,
      error: '',
      workout: action.payload,
    }),
    fetchWorkoutFailure: (_, action: PayloadAction<string>) => ({
      loading: false,
      error: action.payload,
      workout: null,
    }),
    clearWorkout: (_) => ({
      loading: false,
      error: '',
      workout: null,
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
