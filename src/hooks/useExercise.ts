import { useEffect } from 'react'
import { fetchExercises } from '@/slice/exercisesSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { exercisesData } from '../../data/exercises'

const useExercise = () => {
  const dispatch = useAppDispatch()
  const exercises = useAppSelector((state) => state.exercises)

  useEffect(() => {
    if (exercises.data.length === 0) {
      dispatch(fetchExercises())
    }
  }, [dispatch, exercises.data.length])

  return exercises
}

export default useExercise
