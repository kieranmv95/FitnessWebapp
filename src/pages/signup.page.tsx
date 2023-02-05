import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Signup } from '@/components/Forms'
import Seo from '@/components/Seo'
import styles from '../styles/pages/loginsignup.module.scss'

export default function SignUpPage() {
  const { user } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user.loading && user.loggedIn) {
      router.push('/app')
    }
  }, [user, router])

  return (
    <>
      <Seo title="Signup" description="Signup for Fitness App" />
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
