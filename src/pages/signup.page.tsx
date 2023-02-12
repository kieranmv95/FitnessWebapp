import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Signup } from '@/components/Forms'
import Seo from '@/components/Seo'

export default function SignUpPage() {
  const { user } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && user.loggedIn) {
      router.push('/app')
    }
  }, [user])

  return (
    <>
      <Seo title="Signup" description="Signup for Fitness App" />

      <Signup />

      <p className="w-full max-w-sm mx-auto mt-5">
        Already have an account?{' '}
        <span
          className="cursor-pointer hover:text-blue-500 hover:underline"
          onClick={() => router.push('/login')}
        >
          Login now
        </span>
      </p>
    </>
  )
}
