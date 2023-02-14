import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && !user.loggedIn) {
      router.push('/login')
    }
  }, [user])

  if (user.loading || !user.loggedIn)
    return <div className="w-full max-w-xl mx-auto mt-5">Loading...</div>

  return <>{children}</>
}

export default PrivateRoute
