import React from 'react'
import { render } from '@testing-library/react'
import AppPage from '../index.page'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => {
    return {
      push: jest.fn(),
    }
  }),
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

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<AppPage />)
    expect(container).toBeInTheDocument()
  })

  it.todo(
    'should redirect to the /login route when the not loading and not loggedin',
  )

  it.todo('should show laoding test when user is loading')

  it.todo('should render welcome user email when user is logged in')
})
