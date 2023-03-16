import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import SignUpForm from '../index'
import { renderWithProviders } from '../../../../../test/utils'

const mockSignUp = jest.fn()

jest.mock('@/hooks/useStrapiAuth', () => {
  return jest.fn().mockImplementation(() => ({
    signUp: mockSignUp,
  }))
})

describe('<SignUpForm />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<SignUpForm />)
    expect(container).toBeInTheDocument()
  })

  it('should call signup when the signup form is submitted', async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <SignUpForm />,
    )

    const usernameInput = getByPlaceholderText('Enter username')
    fireEvent.change(usernameInput, { target: { value: 'Kieran Venison' } })

    const emailInput = getByPlaceholderText('Enter email')
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })

    const passwordInput = getByPlaceholderText('Enter password')
    fireEvent.change(passwordInput, { target: { value: 'StongP@ssw0rd' } })

    const passwordConfirmInput = getByPlaceholderText('Confirm password')
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'StongP@ssw0rd' },
    })

    const signUpButton = getByText('Sign up now!')
    fireEvent.click(signUpButton)

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        'Kieran Venison',
        'test@test.com',
        'StongP@ssw0rd',
      )
    })
  })

  it('should display errors when signup form is submitted incorrectly', async () => {
    const { getByText, getAllByText } = renderWithProviders(<SignUpForm />)

    const signUpButton = getByText('Sign up now!')
    fireEvent.click(signUpButton)

    await waitFor(() => {
      expect(getAllByText('Required').length).toBe(4)
    })
  })

  it('should show an error when the signup form fails to submit', async () => {
    const mockFailedSignUp = jest.fn(() => false)

    const { getByText, getByPlaceholderText } = renderWithProviders(
      <SignUpForm />,
    )

    const usernameInput = getByPlaceholderText('Enter username')
    fireEvent.change(usernameInput, { target: { value: 'Kieran Venison' } })

    const emailInput = getByPlaceholderText('Enter email')
    fireEvent.change(emailInput, { target: { value: 'test@fail.com' } })

    const passwordInput = getByPlaceholderText('Enter password')
    fireEvent.change(passwordInput, { target: { value: 'StongP@ssw0rd' } })

    const passwordConfirmInput = getByPlaceholderText('Confirm password')
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'StongP@ssw0rd' },
    })

    const signUpButton = getByText('Sign up now!')
    fireEvent.click(signUpButton)

    await waitFor(() => {
      expect(getByText('Signup failed')).toBeInTheDocument()
    })
  })

  it('should show an error for a shit password', async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <SignUpForm />,
    )

    const emailInput = getByPlaceholderText('Enter email')
    fireEvent.change(emailInput, { target: { value: 'test@fail.com' } })

    const passwordInput = getByPlaceholderText('Enter password')
    fireEvent.change(passwordInput, { target: { value: 'shit password' } })

    const passwordConfirmInput = getByPlaceholderText('Confirm password')
    fireEvent.change(passwordConfirmInput, {
      target: { value: 'shit password' },
    })

    const signUpButton = getByText('Sign up now!')
    fireEvent.click(signUpButton)

    await waitFor(() => {
      expect(
        getByText(
          'Password must be at least 8 characters, contain a special character, uppercase, lowercase and a number',
        ),
      ).toBeInTheDocument()
    })
  })
})
