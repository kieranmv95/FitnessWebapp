import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Signup } from '@/components/Forms'
import styles from '../styles/pages/loginsignup.module.scss'

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
      <Head>
        <title>Fitness App | Sign up</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Fitness App</h1>
      <div className={styles.loginForm}>
        <Signup />
        <p className={styles.switchForm}>
          Already have an account?{' '}
          <span onClick={() => router.push('/login')}>Login now</span>
        </p>
      </div>
    </>
  )
}
