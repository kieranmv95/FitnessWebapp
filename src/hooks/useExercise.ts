import { useEffect } from 'react'
import { fetchExercises } from '@/slice/exercisesSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

const useExercise = () => {
  const dispatch = useAppDispatch()
  const exercises = useAppSelector((state) => state.exercises)

  useEffect(() => {
    if (exercises.data.length === 0 && !exercises.error && !exercises.loading) {
      dispatch(fetchExercises())
    }
  }, [])

  return exercises
}

export default useExercise
