import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Login } from '@/components/Forms'
import Seo from '@/components/Seo'
import styles from '../styles/pages/loginsignup.module.scss'

export default function LoginPage() {
  const { user } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && user.loggedIn) {
      router.push('/app')
    }
  }, [user, router])

  return (
    <>
      <Seo title="Login" description="Login to your Fitness App account" />
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
