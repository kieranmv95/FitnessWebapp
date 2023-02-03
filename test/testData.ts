import { IUser } from '@/hooks/useFirebaseAuth'
import { User } from '@firebase/auth'

export const AUTHED_USER_MOCK: IUser = {
  data: {
    email: 'test@test.com',
  } as User,
  loggedIn: true,
  loading: false,
}

export const UNAUTHED_USER_MOCK: IUser = {
  data: null,
  loggedIn: false,
  loading: true,
}
