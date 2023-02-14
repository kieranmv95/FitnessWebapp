import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'
import useExercise from '@/hooks/useExercise'
import ExerciseCard from '@/components/ExerciseCard'
import { IExercise } from '@/slice/exercisesSlice'

type ExerciseListReducer = {
  [key: string]: IExercise[]
}

export default function App() {
  const exerciseState = useExercise()

  const getExercises = () => {
    const exerciseList = [...exerciseState.data]
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((acc, curr) => {
        const firstLetter = curr.name.charAt(0).toUpperCase()
        if (!acc[firstLetter]) {
          acc[firstLetter] = [curr]
        } else {
          acc[firstLetter].push(curr)
        }

        return acc
      }, {} as ExerciseListReducer)

    return Object.keys(exerciseList).map((key) => (
      <div key={key}>
        <p className="px-6 py-2 text-xl font-extrabold sticky top-0 bg-white">
          {key}
        </p>
        <div className="px-6 py-2 grid gap-3">
          {exerciseList[key].map((exercise) => (
            <ExerciseCard key={exercise.name} exercise={exercise} />
          ))}
        </div>
      </div>
    ))
  }

  return (
    <PrivateRoute>
      <Seo title="Dashboard" description="Fitness App Dashboard" />
      <div className="text-zinc-800">
        <h1 className="px-6 font-semibold text-3xl mb-4 mt-6">Exercises</h1>
        {exerciseState.loading && <p>Loading...</p>}
        {getExercises()}
      </div>
    </PrivateRoute>
  )
}
