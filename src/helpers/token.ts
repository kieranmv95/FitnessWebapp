import { AUTH_TOKEN } from '@/constants'
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN)
  }
}

const setToken = (token: string) => {
  if (token && typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
}

export { getToken, setToken, removeToken }
