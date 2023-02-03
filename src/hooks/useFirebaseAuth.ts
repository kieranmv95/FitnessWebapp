import app from '../firebase'
import {
  signInWithEmailAndPassword,
  getAuth,
  User,
  signOut,
  createUserWithEmailAndPassword,
} from '@firebase/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export type IUser = {
  data: User | null
  loggedIn: boolean
  loading: boolean
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<IUser>({
    data: null,
    loggedIn: false,
    loading: true,
  })
  const router = useRouter()
  const auth = getAuth(app)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          data: user,
          loggedIn: true,
          loading: false,
        })
      } else {
        setUser({
          data: null,
          loggedIn: false,
          loading: false,
        })
        router.push('/login')
      }
    })
  }, [auth, router])

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return true
    } catch {
      return false
    }
  }

  const logout = async () => {
    setUser({
      data: null,
      loading: true,
      loggedIn: false,
    })
    await signOut(auth)
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return true
    } catch {
      return false
    }
  }

  return {
    login,
    signUp,
    user,
    logout,
  }
}
