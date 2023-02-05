import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Login } from '@/components/Forms'
import styles from '../styles/pages/loginsignup.module.scss'

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
      <Head>
        <title>Fitness App | Login</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Fitness App</h1>
      <div className={styles.loginForm}>
        <Login />
        <p className={styles.switchForm}>
          Not got an account?{' '}
          <span onClick={() => router.push('/signup')}>Sign up for free</span>
        </p>
      </div>
    </>
  )
}
