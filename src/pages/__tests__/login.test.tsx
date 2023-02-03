import React from 'react'
import { findByText, fireEvent, render, waitFor } from '@testing-library/react'
import LoginPage from '../login.page'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { UNAUTHED_USER_MOCK, AUTHED_USER_MOCK } from '../../../test/testData'

const mockPush = jest.fn()
const mockLogin = jest.fn()
const mockSignUp = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPush,
  }),
}))

jest.mock('@/hooks/useFirebaseAuth')

describe('LoginPage', () => {
  describe('when user is not authenticated', () => {
    beforeEach(() => {
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: UNAUTHED_USER_MOCK,
        login: mockLogin,
        signUp: mockSignUp,
      })
    })

    it('renders without crashing', () => {
      const { container } = render(<LoginPage />)
      expect(container).toBeInTheDocument()
    })

    it('should render a login form by default', () => {
      const { getByText } = render(<LoginPage />)
      expect(getByText('Login now')).toBeInTheDocument()
    })

    it('should toggle signup form when clicking signup link', () => {
      const { getByText } = render(<LoginPage />)

      const signUpLink = getByText('Not got an account? Click to sign up')
      fireEvent.click(signUpLink)

      expect(getByText('Sign up now!')).toBeInTheDocument()
    })

    it('should call login when the login form is submitted', async () => {
      const { getByText, getByPlaceholderText } = render(<LoginPage />)

      const emailInput = getByPlaceholderText('Enter email')
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } })

      const passwordInput = getByPlaceholderText('Enter password')
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      const loginButton = getByText('Login now')
      fireEvent.click(loginButton)

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123')
      })
    })

    it('should call signup when the signup form is submitted', async () => {
      const { getByText, getByPlaceholderText } = render(<LoginPage />)

      const signUpLink = getByText('Not got an account? Click to sign up')
      fireEvent.click(signUpLink)

      const emailInput = getByPlaceholderText('Enter email')
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } })

      const passwordInput = getByPlaceholderText('Enter password')
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      const signUpButton = getByText('Sign up now!')
      fireEvent.click(signUpButton)

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith('test@test.com', 'password123')
      })
    })

    it('should display errors when login form is submitted incorrectly', async () => {
      const { getByText, getAllByText } = render(<LoginPage />)

      const loginButton = getByText('Login now')
      fireEvent.click(loginButton)

      await waitFor(() => {
        expect(getAllByText('Required').length).toBe(2)
      })
    })

    it('should display errors when signup form is submitted incorrectly', async () => {
      const { getByText, getAllByText } = render(<LoginPage />)

      const signUpLink = getByText('Not got an account? Click to sign up')
      fireEvent.click(signUpLink)

      const signUpButton = getByText('Sign up now!')
      fireEvent.click(signUpButton)

      await waitFor(() => {
        expect(getAllByText('Required').length).toBe(2)
      })
    })

    it('should show an error when the login form fails to submit', async () => {
      const mockFailedLogin = jest.fn(() => false)
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: UNAUTHED_USER_MOCK,
        login: mockFailedLogin,
        signUp: mockSignUp,
      })

      const { getByText, getByPlaceholderText } = render(<LoginPage />)

      const emailInput = getByPlaceholderText('Enter email')
      fireEvent.change(emailInput, { target: { value: 'test@fail.com' } })

      const passwordInput = getByPlaceholderText('Enter password')
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      const loginButton = getByText('Login now')
      fireEvent.click(loginButton)

      await waitFor(() => {
        expect(getByText('Login failed')).toBeInTheDocument()
      })
    })

    it('should show an error when the signup form fails to submit', async () => {
      const mockFailedSignUp = jest.fn(() => false)
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: UNAUTHED_USER_MOCK,
        login: mockLogin,
        signUp: mockFailedSignUp,
      })

      const { getByText, getByPlaceholderText } = render(<LoginPage />)

      const signUpLink = getByText('Not got an account? Click to sign up')
      fireEvent.click(signUpLink)

      const emailInput = getByPlaceholderText('Enter email')
      fireEvent.change(emailInput, { target: { value: 'test@fail.com' } })

      const passwordInput = getByPlaceholderText('Enter password')
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      const signUpButton = getByText('Sign up now!')
      fireEvent.click(signUpButton)

      await waitFor(() => {
        expect(getByText('Signup failed')).toBeInTheDocument()
      })
    })
  })

  describe('when user is authenticated', () => {
    beforeEach(() => {
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: AUTHED_USER_MOCK,
        login: jest.fn(),
        signUp: jest.fn(),
      })
    })

    it('should redirect to the /app route when the user is logged in', () => {
      render(<LoginPage />)

      expect(mockPush).toHaveBeenCalledWith('/app')
    })
  })
})
