import Seo from '@/components/Seo'
import { useRouter } from 'next/router'
import PrivateRoute from '@/components/PrivateRoute'
import { Workout } from '@/components/Forms'
import useWorkout from '@/hooks/useWorkout'
import Loading from '@/components/Loading'
import { useEffect } from 'react'

const WorkoutPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { workout, getWorkoutById } = useWorkout()

  useEffect(() => {
    if (id) {
      getWorkoutById(id as string)
    }
  }, [id])

  return (
    <PrivateRoute>
      <Seo
        title="Workouts"
        description="Create and start your new workouts here"
      />
      <Seo title="Exercises" description="Look at all the exercises" />
      {workout.loading && <Loading />}
      {!workout.loading && workout.data && <Workout data={workout.data} />}
    </PrivateRoute>
  )
}

export default WorkoutPage
