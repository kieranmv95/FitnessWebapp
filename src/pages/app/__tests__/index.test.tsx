import React from 'react'
import { render, waitFor } from '@testing-library/react'
import AppPage from '../index.page'
import { UNAUTHED_USER_MOCK, AUTHED_USER_MOCK } from '../../../../test/testData'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => {
    return {
      push: mockPush,
    }
  }),
}))

jest.mock('@/hooks/useFirebaseAuth')

jest.mock('@/hooks/useFirebaseAuth')

describe('App', () => {
  beforeEach(() => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: AUTHED_USER_MOCK,
      logout: jest.fn(),
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = render(<AppPage />)
    expect(container).toBeInTheDocument()
  })

  it('should show loading test when user is loading', () => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
    })

    const { getByText } = render(<AppPage />)
    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('should render welcome user email when user is logged in', () => {
    const { getByText } = render(<AppPage />)
    expect(getByText('Welcome test@test.com')).toBeInTheDocument()
  })
})
