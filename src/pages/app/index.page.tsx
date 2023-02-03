import Head from 'next/head'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

export default function App() {
  const { user, logout } = useFirebaseAuth()

  if (user.loading) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Fitness App | App</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>Welcome {user.data?.email}</h1>
        <button onClick={logout}>Logout</button>
      </>
    </>
  )
}
