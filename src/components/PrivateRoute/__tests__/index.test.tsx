import { render } from '@testing-library/react'
import PrivateRoute from '../index'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { UNAUTHED_USER_MOCK } from '../../../../test/testData'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    push: mockPush,
  }),
}))

jest.mock('@/hooks/useFirebaseAuth')

describe('<PrivateRoute />', () => {
  it('renders without crashing', () => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: UNAUTHED_USER_MOCK,
    })
    const { container } = render(<PrivateRoute>Private Content</PrivateRoute>)
    expect(container).toBeInTheDocument()
  })

  it('renders "Loading..." when the user is loading', () => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: {
        data: null,
        loggedIn: false,
        loading: true,
      },
    })

    const { getByText } = render(<PrivateRoute>Private Content</PrivateRoute>)
    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('when user is not loading and is not logged in push to /login', () => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: {
        data: null,
        loggedIn: false,
        loading: false,
      },
    })

    render(<PrivateRoute>Private Content</PrivateRoute>)
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('when user is not loading and logged in display content', () => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: {
        data: null,
        loggedIn: true,
        loading: false,
      },
    })

    const { getByText } = render(<PrivateRoute>Private Content</PrivateRoute>)
    expect(getByText('Private Content')).toBeInTheDocument()
  })

  it('user changes to not logged from logged in in push to /login', () => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: {
        data: null,
        loggedIn: true,
        loading: false,
      },
    })

    const { getByText } = render(<PrivateRoute>Private Content</PrivateRoute>)
    expect(getByText('Private Content')).toBeInTheDocument()
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: {
        data: null,
        loggedIn: false,
        loading: false,
      },
    })

    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
