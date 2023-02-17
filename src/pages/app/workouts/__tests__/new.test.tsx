import React from 'react'
import { render } from '@testing-library/react'
import NewWorkoutPage from '../new.page'
import { AUTHED_USER_MOCK } from '../../../../../test/testData'
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

describe('<NewWorkoutPage />', () => {
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
    const { container } = render(<NewWorkoutPage />)
    expect(container).toBeInTheDocument()
  })

  it('should render a add exercises button', () => {
    const { getByText } = render(<NewWorkoutPage />)
    expect(getByText('Add Exercises')).toBeInTheDocument()
  })
})
