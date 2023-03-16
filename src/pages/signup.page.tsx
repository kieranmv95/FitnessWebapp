import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Signup } from '@/components/Forms'
import Seo from '@/components/Seo'
import useStrapiAuth from '@/hooks/useStrapiAuth'

export default function SignUpPage() {
  const { isLoading, loggedIn } = useStrapiAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && loggedIn) {
      router.push('/app')
    }
  }, [isLoading, loggedIn])

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
