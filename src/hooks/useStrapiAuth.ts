import { useEffect } from 'react'
import { getToken } from '@/helpers/token'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import {
  fetchLoggedInUser,
  logout as logoutSlice,
  signUpUser,
  login as loginSlice,
  setLoading,
} from '@/slice/authSlice'

const useStrapiAuth = () => {
  const authToken = getToken()
  const { user, loggedIn, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutSlice())
  }

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const originalPromiseResult = await dispatch(
        signUpUser({ username, email, password }),
      ).unwrap()

      return !originalPromiseResult?.error
    } catch {
      return false
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const originalPromiseResult = await dispatch(
        loginSlice({ identifier: username, password }),
      ).unwrap()

      return !originalPromiseResult?.error
    } catch {
      return false
    }
  }

  useEffect(() => {
    if (!user && authToken) {
      dispatch(fetchLoggedInUser(authToken))
    }
  }, [user])

  return {
    logout,
    signUp,
    login,
    user,
    loggedIn,
    isLoading,
  }
}

export default useStrapiAuth
