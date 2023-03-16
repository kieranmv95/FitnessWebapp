import { IAuthState } from '@/slice/authSlice'

export const AUTHED_USER_MOCK: IAuthState = {
  user: {
    id: 3,
    username: 'Kieran Venison',
    email: 'venison@hey.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2023-03-15T13:27:03.950Z',
    updatedAt: '2023-03-15T13:27:03.950Z',
  },
  loggedIn: true,
  isLoading: false,
  error: '',
}
