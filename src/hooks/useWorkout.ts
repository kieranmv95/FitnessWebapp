import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import {
  IWorkout,
  fetchWorkout,
  fetchWorkoutSuccess,
} from '@/slice/workoutSlice'

const testWorkout: IWorkout = {
  name: 'Test Workout',
  folder: 'hypertrophy',
  exercises: [
    {
      id: '0987t6rdtxc23',
      name: 'Assisted Pullup',
      muscleGroup: 'Lats',
      equipment: 'Assisted Bodyweight',
      type: 'Strength',
      form: 'WeightAndReps',
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
      muscleGroup: 'Quadriceps',
      equipment: 'Machine',
      type: 'Cardio',
      form: 'DistanceAndTime',
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
      muscleGroup: 'Quadriceps',
      equipment: 'Barbell',
      type: 'Strength',
      form: 'WeightAndReps',
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

const useWorkout = () => {
  const dispatch = useAppDispatch()
  const workout = useAppSelector((state) => state.workout)

  const getWorkoutById = (id: string) => {
    dispatch(fetchWorkout())
    console.log(`get workout ${id}`)

    setTimeout(() => {
      dispatch(fetchWorkoutSuccess(testWorkout))
    }, 1000)
  }

  return {
    getWorkoutById,
    workout,
  }
}

export default useWorkout
