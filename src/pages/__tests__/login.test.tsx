import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import LoginPage from '../login.page'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/hooks/useFirebaseAuth', () => ({
  useFirebaseAuth: jest.fn(() => {
    return {
      user: {
        data: null,
        loading: false,
        loggedIn: false,
      },
      login: jest.fn(),
      signUp: jest.fn(),
    }
  }),
}))

describe('LoginPage', () => {
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

  it.todo('should redirect to the /app route when the user is logged in')

  it.todo('should call login when the login form is submitted')

  it.todo('should call signup when the signup form is submitted')

  it.todo('should display errors when login form is submitted incorrectly')

  it.todo('should display errors when signup form is submitted incorrectly')

  it.todo('should show an error when the login form fails to submit')

  it.todo('should show an error when the signup form fails to submit')
})
