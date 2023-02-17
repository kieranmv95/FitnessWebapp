import React from 'react'
import { render } from '@testing-library/react'
import WorkoutPage from '../index.page'
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

describe('<WorkoutPage />', () => {
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
    const { container } = render(<WorkoutPage />)
    expect(container).toBeInTheDocument()
  })

  it('should redirect to new eworkout page when button is clicked', () => {
    const { getByText } = render(<WorkoutPage />)
    const button = getByText('New Workout')
    button.click()
    expect(mockPush).toHaveBeenCalledWith('/app/workouts/new')
  })
})
