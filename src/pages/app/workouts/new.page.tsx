import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'

export default function Workouts() {
  return (
    <PrivateRoute>
      <Seo
        title="Workouts"
        description="Create and start your new workouts here"
      />
    </PrivateRoute>
  )
}
