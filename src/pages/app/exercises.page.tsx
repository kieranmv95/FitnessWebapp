import Seo from '@/components/Seo'
import { useAppSelector } from '@/hooks/useRedux'
import useExercise from '@/hooks/useExercise'
import { IExercise } from '@/slice/exercisesSlice'
import PrivateRoute from '@/components/PrivateRoute'
import ExerciseCard from '@/components/ExerciseCard'
import Filters from '@/components/Filters'
import AppliedFilters from '@/components/AppliedFilters'
import Loading from '@/components/Loading'

type ExerciseListReducer = {
  [key: string]: IExercise[]
}

export default function App() {
  const exerciseState = useExercise()
  const { textSearch, category, muscleGroup } = useAppSelector(
    (state) => state.filters,
  )

  const getExercises = () => {
    const exerciseList = [...exerciseState.data]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(textSearch.toLowerCase()) ||
          exercise.category.toLowerCase().includes(textSearch.toLowerCase()) ||
          exercise.muscleGroup.toLowerCase().includes(textSearch.toLowerCase()),
      )
      .filter((exercise) => exercise.category.includes(category))
      .filter((exercise) => exercise.muscleGroup.includes(muscleGroup))

    return exerciseList
  }

  const groupExercises = (exercises: IExercise[]) => {
    const exerciseList = exercises.reduce((acc, curr) => {
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
        <p className="py-2 text-xl font-bold bg-white">{key}</p>
        <div className="py-2 grid gap-3 md:gap-6">
          {exerciseList[key].map((exercise) => (
            <ExerciseCard key={exercise.name} exercise={exercise} />
          ))}
        </div>
      </div>
    ))
  }

  const exercises = getExercises()
  const exerciseGrouped = groupExercises(exercises)

  return (
    <PrivateRoute>
      <Seo title="Exercises" description="Look at all the exercises" />
      <div className="text-zinc-800 p-6">
        <h1 className="font-semibold text-3xl mb-4">Exercises</h1>
        {exerciseState.loading && <Loading />}
        {!exerciseState.loading && (
          <div className="md:grid md:gap-6 md:grid-cols-[15rem_1fr] lg:grid-cols-[20rem_1fr]">
            <div>
              <Filters />
            </div>
            <div>
              <AppliedFilters results={exercises.length} />
              {exerciseGrouped}
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  )
}
