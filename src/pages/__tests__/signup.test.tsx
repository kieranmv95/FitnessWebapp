import { fireEvent, render } from '@testing-library/react'
import SignupPage from '../signup.page'
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

describe('SignupPage', () => {
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
      const { container } = render(<SignupPage />)
      expect(container).toBeInTheDocument()
    })

    it('should render a sign in form by default', () => {
      const { getByText } = render(<SignupPage />)
      expect(getByText('Sign Up')).toBeInTheDocument()
    })

    it('should redirect to login page when user clicks signup link', () => {
      const { getByText } = render(<SignupPage />)

      const signUpLink = getByText('Login now')
      fireEvent.click(signUpLink)

      expect(mockPush).toHaveBeenCalledWith('/login')
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
      render(<SignupPage />)

      expect(mockPush).toHaveBeenCalledWith('/app')
    })
  })
})
