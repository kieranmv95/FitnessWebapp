import Header from '../index'
import { AUTHED_USER_MOCK } from '../../../../test/testData'
import { renderWithProviders } from '../../../../test/utils'

const mockLogout = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

describe('<Header />', () => {
  describe('unauthenticated', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProviders(<Header />)
      expect(container).toBeInTheDocument()
    })

    it('renders login button', () => {
      const { getByText } = renderWithProviders(<Header />)
      expect(getByText('Login')).toBeInTheDocument()
    })
  })

  describe('authenticated', () => {
    it('renders logout button', () => {
      const { getByText } = renderWithProviders(<Header />, {
        preloadedState: {
          auth: AUTHED_USER_MOCK,
        },
      })
      expect(getByText('Logout')).toBeInTheDocument()
    })

    it('renders authenticated links', () => {
      const { getByText } = renderWithProviders(<Header />, {
        preloadedState: {
          auth: AUTHED_USER_MOCK,
        },
      })
      expect(getByText('Dashboard')).toBeInTheDocument()
      expect(getByText('Exercises')).toBeInTheDocument()
      expect(getByText('Workouts')).toBeInTheDocument()
    })
  })
})
