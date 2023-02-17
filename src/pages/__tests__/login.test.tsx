import { fireEvent, render } from '@testing-library/react'
import LoginPage from '../login.page'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { UNAUTHED_USER_MOCK, AUTHED_USER_MOCK } from '../../../test/testData'

const mockPush = jest.fn()
const mockLogin = jest.fn()
const mockSignUp = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPush,
  }),
}))

jest.mock('@/hooks/useFirebaseAuth')

describe('LoginPage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: UNAUTHED_USER_MOCK,
        login: mockLogin,
        signUp: mockSignUp,
      })
    })

    it('renders without crashing', () => {
      const { container } = render(<LoginPage />)
      expect(container).toBeInTheDocument()
    })

    it('should render a login form by default', () => {
      const { getByText } = render(<LoginPage />)
      expect(getByText('Login now')).toBeInTheDocument()
    })

    it('should redirect to signup when user clicks signup link', () => {
      const { getByText } = render(<LoginPage />)

      const signUpLink = getByText('Sign up for free')
      fireEvent.click(signUpLink)

      expect(mockPush).toHaveBeenCalledWith('/signup')
    })
  })

  describe('when user is authenticated', () => {
    beforeEach(() => {
      ;(useFirebaseAuth as jest.Mock).mockReturnValue({
        user: AUTHED_USER_MOCK,
        login: jest.fn(),
        signUp: jest.fn(),
      })
    })

    it('should redirect to the /app route when the user is logged in', () => {
      render(<LoginPage />)

      expect(mockPush).toHaveBeenCalledWith('/app')
    })
  })
})
