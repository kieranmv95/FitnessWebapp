import React from 'react'
import AppPage from '../index.page'
import { AUTHED_USER_MOCK } from '../../../../test/testData'
import { renderWithProviders } from '../../../../test/utils'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<AppPage />, {
      preloadedState: {
        auth: AUTHED_USER_MOCK,
      },
    })
    expect(container).toBeInTheDocument()
  })

  it('should show loading text when user is loading', () => {
    const { getByText } = renderWithProviders(<AppPage />, {
      preloadedState: {
        auth: {
          user: undefined,
          loggedIn: false,
          isLoading: true,
          error: '',
        },
      },
    })
    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('should render welcome username when user is logged in', () => {
    const { getByText } = renderWithProviders(<AppPage />, {
      preloadedState: {
        auth: AUTHED_USER_MOCK,
      },
    })
    expect(getByText('Kieran Venison')).toBeInTheDocument()
  })
})
