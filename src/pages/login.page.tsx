import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Login, Signup } from '@/components/Forms'

export default function LoginPage() {
  const { user } = useFirebaseAuth()
  const router = useRouter()
  const [loginView, setLoginView] = useState(true)

  useEffect(() => {
    if (!user.loading && user.loggedIn) {
      router.push('/app')
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Fitness App | Login</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>Fitness App</h1>
        {loginView ? (
          <>
            <Login />
            <p>
              Not got an account?{' '}
              <div onClick={() => setLoginView(false)}>Sign up for free</div>
            </p>
          </>
        ) : (
          <>
            <Signup />
            <p>
              Already have an account?{' '}
              <div onClick={() => setLoginView(true)}>Login now</div>
            </p>
          </>
        )}
      </>
    </>
  )
}
