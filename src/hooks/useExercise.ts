import { useEffect } from 'react'
import {
  fetchExercises,
  fetchExercisesSuccess,
  IExercise,
} from '@/slice/exercisesSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

const exercisesData: IExercise[] = [
  {
    name: 'Bench Press',
    muscleGroup: 'Chest',
    category: 'Barbell',
  },
  {
    name: 'Bicep Curl',
    muscleGroup: 'Arms',
    category: 'Dumbbell',
  },
  {
    name: 'Bent over row',
    muscleGroup: 'Back',
    category: 'Barbell',
  },
  {
    name: 'Bench Dip',
    muscleGroup: 'Arms',
    category: 'Bodyweight',
  },
  {
    name: 'Squat (Barbell)',
    muscleGroup: 'Legs',
    category: 'Barbell',
  },
  {
    name: 'Deadlift (Barbell)',
    muscleGroup: 'Legs',
    category: 'Barbell',
  },
  {
    name: 'Deadlift (Dumbbell)',
    muscleGroup: 'Legs',
    category: 'Dumbbell',
  },
  {
    name: 'Clean & Jerk',
    muscleGroup: 'Olympic',
    category: 'Barbell',
  },
  {
    name: 'Power Clean',
    muscleGroup: 'Olympic',
    category: 'Barbell',
  },
  {
    name: 'Chest Fly',
    muscleGroup: 'Chest',
    category: 'Cable',
  },
  {
    name: 'Chest Dip',
    muscleGroup: 'Chest',
    category: 'Bodyweight',
  },
  {
    name: 'Calf Raise',
    muscleGroup: 'Legs',
    category: 'Bodyweight',
  },
  {
    name: 'Chin Up',
    muscleGroup: 'Back',
    category: 'Bodyweight',
  },
  {
    name: 'Cycling',
    muscleGroup: 'Legs',
    category: 'Cardio',
  },
  {
    name: 'Thruster (Barbell)',
    muscleGroup: 'Full Body',
    category: 'Barbell',
  },
  {
    name: 'Thruster (Dumbbell)',
    muscleGroup: 'Full Body',
    category: 'Dumbbell',
  },
  {
    name: 'Double Under',
    muscleGroup: 'Legs',
    category: 'Reps',
  },
  {
    name: 'Single Under',
    muscleGroup: 'Legs',
    category: 'Reps',
  },
]

const useExercise = () => {
  const dispatch = useAppDispatch()
  const exercises = useAppSelector((state) => state.exercises)

  useEffect(() => {
    if (exercises.data.length === 0) {
      dispatch(fetchExercises())
      setTimeout(() => {
        dispatch(fetchExercisesSuccess(exercisesData))
      }, 1000)
    }
  }, [dispatch, exercises.data.length])

  return exercises
}

export default useExercise
