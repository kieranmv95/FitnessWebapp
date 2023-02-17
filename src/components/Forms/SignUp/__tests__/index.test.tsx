import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import SignUpForm from '../index'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { UNAUTHED_USER_MOCK } from '../../../../../test/testData'

const mockSignUp = jest.fn()
jest.mock('@/hooks/useFirebaseAuth')

describe('<SignUpForm />', () => {
  beforeEach(() => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
      signUp: mockSignUp,
    })
  })

  it('renders without crashing', () => {
    const { container } = render(<SignUpForm />)
    expect(container).toBeInTheDocument()
  })

  it('should call signup when the signup form is submitted', async () => {
    const { getByText, getByPlaceholderText } = render(<SignUpForm />)

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
      expect(mockSignUp).toHaveBeenCalledWith('test@test.com', 'StongP@ssw0rd')
    })
  })

  it('should display errors when signup form is submitted incorrectly', async () => {
    const { getByText, getAllByText } = render(<SignUpForm />)

    const signUpButton = getByText('Sign up now!')
    fireEvent.click(signUpButton)

    await waitFor(() => {
      expect(getAllByText('Required').length).toBe(3)
    })
  })

  it('should show an error when the signup form fails to submit', async () => {
    const mockFailedSignUp = jest.fn(() => false)
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
      signUp: mockFailedSignUp,
    })

    const { getByText, getByPlaceholderText } = render(<SignUpForm />)

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
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
      signUp: jest.fn(),
    })

    const { getByText, getByPlaceholderText } = render(<SignUpForm />)

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
