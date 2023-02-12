import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Login } from '@/components/Forms'
import Seo from '@/components/Seo'

export default function LoginPage() {
  const { user } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && user.loggedIn) {
      router.push('/app')
    }
  }, [user])

  return (
    <>
      <Seo title="Login" description="Login to your Fitness App account" />

      <Login />

      <p className="w-full max-w-sm mx-auto mt-5">
        Not got an account?{' '}
        <span
          className="cursor-pointer hover:text-blue-500 hover:underline"
          onClick={() => router.push('/signup')}
        >
          Sign up for free
        </span>
      </p>
    </>
  )
}
