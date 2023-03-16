import { fireEvent } from '@testing-library/react'
import SignupPage from '../signup.page'
import { AUTHED_USER_MOCK } from '../../../test/testData'
import { renderWithProviders } from '../../../test/utils'

const mockPush = jest.fn()
const mockLogin = jest.fn()
const mockSignUp = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('SignupPage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when user is not authenticated', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProviders(<SignupPage />)
      expect(container).toBeInTheDocument()
    })

    it('should render a sign in form by default', () => {
      const { getByText } = renderWithProviders(<SignupPage />)
      expect(getByText('Sign Up')).toBeInTheDocument()
    })

    it('should redirect to login page when user clicks signup link', () => {
      const { getByText } = renderWithProviders(<SignupPage />)

      const signUpLink = getByText('Login now')
      fireEvent.click(signUpLink)

      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  describe('when user is authenticated', () => {
    it('should redirect to the /app route when the user is logged in', () => {
      renderWithProviders(<SignupPage />, {
        preloadedState: {
          auth: AUTHED_USER_MOCK,
        },
      })

      expect(mockPush).toHaveBeenCalledWith('/app')
    })
  })
})
