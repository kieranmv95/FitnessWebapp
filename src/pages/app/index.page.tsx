import Head from 'next/head'
import { useEffect } from 'react'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { useRouter } from 'next/router'

export default function App() {
  const { user, logout } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && !user.loggedIn) {
      router.push('/login')
    }
  }, [user, router])

  if (user.loading) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Fitness App | App</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome {user.data?.email}</h1>
        <button onClick={logout}>Logout</button>
      </main>
    </>
  )
}
