import React from 'react'
import ExercisePage from '../exercises.page'
import { renderWithProviders } from '../../../../test/utils'
import { AUTHED_USER_MOCK } from '../../../../test/testData'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

describe('<ExercisePage />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<ExercisePage />, {
      preloadedState: {
        auth: AUTHED_USER_MOCK,
      },
    })
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
        auth: AUTHED_USER_MOCK,
      },
    })

    expect(getByText('Loading...')).toBeInTheDocument()
  })
})
