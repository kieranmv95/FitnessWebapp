import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '@/constants'
import { removeToken, setToken } from '@/helpers/token'

export type IUser = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

export type IAuthState = {
  user: undefined | IUser
  loggedIn: boolean
  isLoading: boolean
  error: string
}

const initialState: IAuthState = {
  user: undefined,
  loggedIn: false,
  isLoading: false,
  error: '',
}

export const fetchLoggedInUser = createAsyncThunk(
  'auth/fetchLoggedInUser',
  async (token: string) => {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  },
)

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (details: { username: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
      },
    })
    return await response.json()
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async (details: { identifier: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
      },
    })
    return await response.json()
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      removeToken()
      return {
        ...initialState,
        isLoading: false,
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoggedInUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.loggedIn = true
    })
    builder.addCase(fetchLoggedInUser.rejected, (state, action) => {
      state.isLoading = false
      state.user = undefined
      state.error = 'failed to load user'
    })
    builder.addCase(signUpUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUpUser.rejected, (state) => {
      state.isLoading = false
      state.error = 'failed to sign up user'
    })
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.error = 'failed to login user'
      } else {
        setToken(action.payload.jwt)
        state.user = action.payload.user
        state.loggedIn = true
        state.error = ''
        state.isLoading = false
      }
    })
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.error = 'failed to login user'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      if (action.payload?.error) {
        state.error = 'failed to login user'
      } else {
        setToken(action.payload.jwt)
        state.user = action.payload.user
        state.loggedIn = true
        state.error = ''
      }
    })
  },
})

const { actions, reducer } = authSlice

export const { logout, setLoading } = actions

export default reducer
