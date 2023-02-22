import { useEffect } from 'react'
import {
  fetchExercises,
  fetchExercisesSuccess,
  IExercise,
} from '@/slice/exercisesSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

const exercisesData: IExercise[] = [
  {
    id: '323wefygdy',
    name: 'Bench Press',
    muscleGroup: 'Chest',
    category: 'Barbell',
  },
  {
    id: '6bdvdu8y',
    name: 'Bicep Curl',
    muscleGroup: 'Arms',
    category: 'Dumbbell',
  },
  {
    id: '98y32897gvuw',
    name: 'Bent over row',
    muscleGroup: 'Back',
    category: 'Barbell',
  },
  {
    id: '1920bj8ug878',
    name: 'Bench Dip',
    muscleGroup: 'Arms',
    category: 'Bodyweight',
  },
  {
    id: 'wjklncisd8',
    name: 'Squat (Barbell)',
    muscleGroup: 'Legs',
    category: 'Barbell',
  },
  {
    id: '0987t6rdtxc',
    name: 'Deadlift (Barbell)',
    muscleGroup: 'Legs',
    category: 'Barbell',
  },
  {
    id: '0987t6rdtxc23',
    name: 'Assisted Pullup',
    muscleGroup: 'Back',
    category: 'Assisted Bodyweight',
  },
  {
    id: '0987t6rdtxc232',
    name: 'Pullup',
    muscleGroup: 'Back',
    category: 'Bodyweight',
  },
  {
    id: '90876tqgfwhdlo',
    name: 'Deadlift (Dumbbell)',
    muscleGroup: 'Legs',
    category: 'Dumbbell',
  },
  {
    id: '90876tqgf23dhdlo',
    name: 'Clean & Jerk',
    muscleGroup: 'Olympic',
    category: 'Barbell',
  },
  {
    id: 'qdoichsd783dhdlo',
    name: 'Power Clean',
    muscleGroup: 'Olympic',
    category: 'Barbell',
  },
  {
    id: '97274bvjhg',
    name: 'Chest Fly',
    muscleGroup: 'Chest',
    category: 'Cable',
  },
  {
    id: '8768ghg',
    name: 'Chest Dip',
    muscleGroup: 'Chest',
    category: 'Bodyweight',
  },
  {
    id: 'u756302784kjhg',
    name: 'Calf Raise',
    muscleGroup: 'Legs',
    category: 'Bodyweight',
  },
  {
    id: '898932b7yfc76565',
    name: 'Chin Up',
    muscleGroup: 'Back',
    category: 'Bodyweight',
  },
  {
    id: 'u2398321gbh',
    name: 'Cycling',
    muscleGroup: 'Legs',
    category: 'Cardio',
  },
  {
    id: 'ou2379823ygyu',
    name: 'Thruster (Barbell)',
    muscleGroup: 'Full Body',
    category: 'Barbell',
  },
  {
    id: '217y1278969721839',
    name: 'Thruster (Dumbbell)',
    muscleGroup: 'Full Body',
    category: 'Dumbbell',
  },
  {
    id: '217yiw81278969721839',
    name: 'Double Under',
    muscleGroup: 'Legs',
    category: 'Reps',
  },
  {
    id: '02u83ye78ygwhi',
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
