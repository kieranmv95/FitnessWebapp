import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'

export default function App() {
  const { user } = useFirebaseAuth()

  return (
    <PrivateRoute>
      <Seo title="Dashboard" description="Fitness App Dashboard" />
      <div className="p-6 text-zinc-800">
        <p>Welcome</p>
        <h1 className="font-semibold text-xl">{user.data?.email}</h1>
      </div>
    </PrivateRoute>
  )
}
