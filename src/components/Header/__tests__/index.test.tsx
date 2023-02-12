import { render, act } from '@testing-library/react'
import Header from '../index'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { AUTHED_USER_MOCK, UNAUTHED_USER_MOCK } from '../../../../test/testData'

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

jest.mock('@/hooks/useFirebaseAuth')

describe('<Header />', () => {
  describe('unauthenticated', () => {
    beforeEach(() => {
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: UNAUTHED_USER_MOCK,
        logout: mockLogout,
      })
    })

    it('renders without crashing', () => {
      const { container } = render(<Header />)
      expect(container).toBeInTheDocument()
    })

    it('renders login button', () => {
      const { getByText } = render(<Header />)
      expect(getByText('Login')).toBeInTheDocument()
    })
  })

  describe('authenticated', () => {
    beforeEach(() => {
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: AUTHED_USER_MOCK,
        logout: mockLogout,
      })
    })

    it('renders logout button', () => {
      const { getByText } = render(<Header />)
      expect(getByText('Logout')).toBeInTheDocument()
    })

    it('renders authenticated links', () => {
      const { getByText } = render(<Header />)
      expect(getByText('Dashboard')).toBeInTheDocument()
    })
  })
})
