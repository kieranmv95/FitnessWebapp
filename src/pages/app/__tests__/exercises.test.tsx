import React from 'react'
import ExercisePage from '../exercises.page'
import { renderWithProviders } from '../../../../test/utils'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { AUTHED_USER_MOCK } from '../../../../test/testData'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => {
    return {}
  }),
}))

jest.mock('@/hooks/useFirebaseAuth')

const exercises = {
  loading: false,
  data: [
    {
      name: 'Bench Press',
      muscleGroup: ['Chest'],
      equipment: 'Barbell',
      category: 'Strength',
    },
  ],
  error: '',
}

const multipleExercises = {
  loading: false,
  data: [
    {
      name: 'Bench Press',
      muscleGroup: ['Chest'],
      equipment: 'Barbell',
      category: 'Strength',
    },
    {
      name: 'Calf Raise',
      muscleGroup: ['Legs'],
      equipment: 'Bodyweight',
      category: 'Strength',
    },
  ],
  error: '',
}

describe('<ExercisePage />', () => {
  beforeEach(() => {
    ;(useFirebaseAuth as jest.Mock).mockReturnValue({
      user: AUTHED_USER_MOCK,
      logout: jest.fn(),
    })
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<ExercisePage />)
    expect(container).toBeInTheDocument()
  })

  it('renders an exercise', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: { exercises },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
  })

  it('renders multiple exercise', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: { exercises: multipleExercises },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('Calf Raise')).toBeInTheDocument()
  })

  it('renders the header letter', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: { exercises: exercises },
    })

    expect(getByText('B')).toBeInTheDocument()
  })

  it('renders multiple header letters', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: { exercises: multipleExercises },
    })

    expect(getByText('B')).toBeInTheDocument()
    expect(getByText('C')).toBeInTheDocument()
  })

  it('displays loading if exercises are not loaded', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: { exercises: { ...exercises, loading: true } },
    })

    expect(getByText('Loading...')).toBeInTheDocument()
  })
})
