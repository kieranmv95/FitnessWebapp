import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import LoginForm from '../index'
import { UNAUTHED_USER_MOCK } from '../../../../../test/testData'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

const mockLogin = jest.fn()
jest.mock('@/hooks/useFirebaseAuth')

describe('LoginForm', () => {
  beforeEach(() => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
      login: mockLogin,
    })
  })

  it('renders without crashing', () => {
    const { container } = render(<LoginForm />)
    expect(container).toBeInTheDocument()
  })

  it('should call login when the login form is submitted', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />)

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

  it('should display errors when login form is submitted incorrectly', async () => {
    const { getByText, getAllByText } = render(<LoginForm />)

    const loginButton = getByText('Login now')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(getAllByText('Required').length).toBe(2)
    })
  })

  it('should show an error when the login form fails to submit', async () => {
    const mockFailedLogin = jest.fn(() => false)
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
      login: mockFailedLogin,
    })

    const { getByText, getByPlaceholderText } = render(<LoginForm />)

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
})
