import Seo from '@/components/Seo'
import useExercise from '@/hooks/useExercise'
import PrivateRoute from '@/components/PrivateRoute'
import Filters from '@/components/Filters'
import Loading from '@/components/Loading'
import ExerciseList from '@/components/ExerciseList'

export default function App() {
  const exerciseState = useExercise()

  return (
    <PrivateRoute>
      <Seo title="Exercises" description="Look at all the exercises" />
      <div className="text-zinc-800 p-6">
        <h1 className="font-semibold text-3xl mb-4">Exercises</h1>
        {exerciseState.loading && <Loading />}
        {!exerciseState.loading && (
          <div className="md:grid md:gap-6 md:grid-cols-[18rem_1fr] lg:grid-cols-[20rem_1fr]">
            <div>
              <Filters />
            </div>
            <div>
              <ExerciseList
                onExerciseClick={(e) => console.log(`push to ${e.name} page`)}
              />
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  )
}
