import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import Seo from '@/components/Seo'

export default function App() {
  const { user, logout } = useFirebaseAuth(true)

  if (user.loading) return <div>Loading...</div>

  return (
    <>
      <Seo title="Dashboard" description="Fitness App Dashboard" />
      <h1>Welcome {user.data?.email}</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}
