import PrivateRoute from '../index'
import { renderWithProviders } from '../../../../test/utils'
import { AUTHED_USER_MOCK } from '../../../../test/testData'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPush,
  }),
}))

jest.mock('@/helpers/token', () => ({
  ...jest.requireActual('@/helpers/token'),
  getToken: jest.fn(() => 'token'),
}))

describe('<PrivateRoute />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(
      <PrivateRoute>Private Content</PrivateRoute>,
    )
    expect(container).toBeInTheDocument()
  })

  it('renders "Loading..." when the user is loading', () => {
    const { getByText } = renderWithProviders(
      <PrivateRoute>Private Content</PrivateRoute>,
      {
        preloadedState: {
          auth: {
            user: undefined,
            loggedIn: false,
            isLoading: true,
            error: '',
          },
        },
      },
    )
    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('when user is not loading and logged in display content', () => {
    const { getByText } = renderWithProviders(
      <PrivateRoute>Private Content</PrivateRoute>,
      {
        preloadedState: {
          auth: AUTHED_USER_MOCK,
        },
      },
    )
    expect(getByText('Private Content')).toBeInTheDocument()
  })
})
