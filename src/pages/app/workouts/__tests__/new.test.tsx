import React from 'react'
import NewWorkoutPage from '../new.page'
import { AUTHED_USER_MOCK } from '../../../../../test/testData'
import { renderWithProviders } from '../../../../../test/utils'

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => {
    return {
      push: mockPush,
    }
  }),
}))

describe('<NewWorkoutPage />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<NewWorkoutPage />, {
      preloadedState: {
        auth: AUTHED_USER_MOCK,
      },
    })
    expect(container).toBeInTheDocument()
  })
})
