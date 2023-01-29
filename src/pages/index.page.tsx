import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Fitness App | Home</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Fitness App</h1>

        <Link href="/login">Login</Link>
      </main>
    </>
  )
}
