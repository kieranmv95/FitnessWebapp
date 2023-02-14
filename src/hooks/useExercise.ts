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
    muscleGroup: ['Chest'],
    equipment: 'Barbell',
    category: 'Strength',
  },
  {
    name: 'Bicep Curl',
    muscleGroup: ['Arms'],
    equipment: 'Dumbbell',
    category: 'Strength',
  },
  {
    name: 'Bent over row',
    muscleGroup: ['Back'],
    equipment: 'Barbell',
    category: 'Strength',
  },
  {
    name: 'Bench Dip',
    muscleGroup: ['Arms'],
    equipment: 'Bodyweight',
    category: 'Strength',
  },
  {
    name: 'Squat',
    muscleGroup: ['Legs'],
    equipment: 'Barbell',
    category: 'Strength',
  },
  {
    name: 'Deadlift',
    muscleGroup: ['Legs'],
    equipment: 'Barbell',
    category: 'Strength',
  },
  {
    name: 'Clean and Jerk',
    muscleGroup: ['Legs', 'Glutes', 'Shoulders'],
    equipment: 'Barbell',
    category: 'Olympic',
  },
  {
    name: 'Chest Fly',
    muscleGroup: ['Chest'],
    equipment: 'Cable',
    category: 'Strength',
  },
  {
    name: 'Chest Dip',
    muscleGroup: ['Chest'],
    equipment: 'Bodyweight',
    category: 'Strength',
  },
  {
    name: 'Calf Press',
    muscleGroup: ['Legs'],
    equipment: 'Bodyweight',
    category: 'Strength',
  },
  {
    name: 'Chin Up',
    muscleGroup: ['Back'],
    equipment: 'Bodyweight',
    category: 'Strength',
  },
  {
    name: 'Cycling',
    muscleGroup: ['Legs'],
    equipment: 'Bike',
    category: 'Cardio',
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

  const exercisesList = () => {
    // placeholder function for querying exercises
    return exercises
  }

  return exercises
}

export default useExercise
