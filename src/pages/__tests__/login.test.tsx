import { fireEvent } from '@testing-library/react'
import LoginPage from '../login.page'
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

describe('LoginPage', () => {
  describe('when user is not authenticated', () => {
    it('renders without crashing', () => {
      const { container } = renderWithProviders(<LoginPage />)
      expect(container).toBeInTheDocument()
    })

    it('should render a login form by default', () => {
      const { getByText } = renderWithProviders(<LoginPage />)
      expect(getByText('Login now')).toBeInTheDocument()
    })

    it('should redirect to signup when user clicks signup link', () => {
      const { getByText } = renderWithProviders(<LoginPage />)

      const signUpLink = getByText('Sign up for free')
      fireEvent.click(signUpLink)

      expect(mockPush).toHaveBeenCalledWith('/signup')
    })
  })

  describe('when user is authenticated', () => {
    it('should redirect to the /app route when the user is logged in', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: AUTHED_USER_MOCK,
        },
      })

      expect(mockPush).toHaveBeenCalledWith('/app')
    })
  })
})
