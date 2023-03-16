import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import LoginForm from '../index'
import { renderWithProviders } from '../../../../../test/utils'

const mockLogin = jest.fn()

jest.mock('@/hooks/useStrapiAuth', () => {
  return jest.fn().mockImplementation(() => ({
    login: mockLogin,
  }))
})

describe('<LoginForm />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<LoginForm />)
    expect(container).toBeInTheDocument()
  })

  it('should call login when the login form is submitted', async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <LoginForm />,
    )

    const usernameInput = getByPlaceholderText('Enter username')
    fireEvent.change(usernameInput, { target: { value: 'Kieran Venison' } })

    const passwordInput = getByPlaceholderText('Enter password')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const loginButton = getByText('Login now')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('Kieran Venison', 'password123')
    })
  })

  it('should display errors when login form is submitted incorrectly', async () => {
    const { getByText, getAllByText } = renderWithProviders(<LoginForm />)

    const loginButton = getByText('Login now')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(getAllByText('Required').length).toBe(2)
    })
  })

  it('should show an error when the login form fails to submit', async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <LoginForm />,
    )

    const usernameInput = getByPlaceholderText('Enter username')
    fireEvent.change(usernameInput, { target: { value: 'Kieran Venison' } })

    const passwordInput = getByPlaceholderText('Enter password')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const loginButton = getByText('Login now')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(getByText('Login failed')).toBeInTheDocument()
    })
  })
})
