import React from 'react'
import ExercisePage from '../exercises.page'
import { renderWithProviders } from '../../../../test/utils'
import { AUTHED_USER_MOCK } from '../../../../test/testData'

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

jest.mock('@/hooks/useFirebaseAuth', () => ({
  useFirebaseAuth: () => {
    return {
      user: AUTHED_USER_MOCK,
      logout: jest.fn(),
    }
  },
}))

describe('<ExercisePage />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<ExercisePage />)
    expect(container).toBeInTheDocument()
  })

  it('displays loading if exercises are not loaded', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: {
        exercises: {
          loading: true,
          data: [],
          error: '',
        },
      },
    })

    expect(getByText('Loading...')).toBeInTheDocument()
  })
})
