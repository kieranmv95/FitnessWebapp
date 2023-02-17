import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

export default function Workouts() {
  const { push } = useRouter()

  return (
    <PrivateRoute>
      <Seo
        title="Workouts"
        description="Create and start your new workouts here"
      />
      <div className="text-zinc-800 p-6">
        <h1 className="font-semibold text-3xl mb-4">Workouts</h1>
        <Button onClick={() => push('/app/workouts/new')}>New Workout</Button>
      </div>
    </PrivateRoute>
  )
}
