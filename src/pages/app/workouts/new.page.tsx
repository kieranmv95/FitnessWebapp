import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'
import Button from '@/components/Button'

export default function Workouts() {
  return (
    <PrivateRoute>
      <Seo
        title="Workouts"
        description="Create and start your new workouts here"
      />
      <div className="text-zinc-800 p-6">
        <h1 className="font-semibold text-3xl mb-4">New Workout</h1>
        <Button onClick={() => console.log('Add Exercise')}>
          Add Exercises
        </Button>
      </div>
    </PrivateRoute>
  )
}
