import React from 'react'
import { fireEvent } from '@testing-library/react'
import WorkoutPage from '../index.page'
import { AUTHED_USER_MOCK } from '../../../../../test/testData'
import { renderWithProviders } from '../../../../../test/utils'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      push: mockPush,
    }
  },
}))

describe('<WorkoutPage />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<WorkoutPage />, {
      preloadedState: {
        auth: AUTHED_USER_MOCK,
      },
    })
    expect(container).toBeInTheDocument()
  })

  it('should redirect to new workout page when button is clicked', () => {
    const { getByText } = renderWithProviders(<WorkoutPage />, {
      preloadedState: {
        auth: AUTHED_USER_MOCK,
      },
    })
    const button = getByText('New Workout')
    fireEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/app/workouts/new')
  })
})
