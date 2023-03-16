import { ReactNode, useEffect } from 'react'
import Loading from '@/components/Loading'
import useStrapiAuth from '@/hooks/useStrapiAuth'
import { useRouter } from 'next/router'
import { getToken } from '@/helpers/token'
import useExercise from '@/hooks/useExercise'

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const token = getToken()
  const { loggedIn, isLoading } = useStrapiAuth()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token])

  if (!loggedIn && isLoading) {
    return (
      <div className="p-6">
        <Loading />
      </div>
    )
  }

  return <>{children}</>
}

export default PrivateRoute
