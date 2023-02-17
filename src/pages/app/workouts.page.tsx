import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'

export default function Workouts() {
  return (
    <PrivateRoute>
      <Seo
        title="Workouts"
        description="Create and start your new workouts here"
      />
      <div className="text-zinc-800 p-6">
        <h1 className="font-semibold text-3xl mb-4">Workouts</h1>
      </div>
    </PrivateRoute>
  )
}
