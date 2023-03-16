import Seo from '@/components/Seo'
import PrivateRoute from '@/components/PrivateRoute'
import useStrapiAuth from '@/hooks/useStrapiAuth'

export default function App() {
  const { user } = useStrapiAuth()

  return (
    <PrivateRoute>
      <Seo title="Dashboard" description="Fitness App Dashboard" />
      {user && (
        <div className="p-6 text-zinc-800">
          <p>Welcome</p>
          <h1 className="font-semibold text-xl">{user.username}</h1>
        </div>
      )}
    </PrivateRoute>
  )
}
