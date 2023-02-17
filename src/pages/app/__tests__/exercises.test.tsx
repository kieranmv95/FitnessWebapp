import React from 'react'
import ExercisePage from '../exercises.page'
import { renderWithProviders } from '../../../../test/utils'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { AUTHED_USER_MOCK } from '../../../../test/testData'
import { IExercise } from '@/slice/exercisesSlice'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => {
    return {}
  }),
}))

jest.mock('@/hooks/useFirebaseAuth')

type IMockExercisesType = {
  loading: boolean
  data: IExercise[]
  error: string
}

const exercises: IMockExercisesType = {
  loading: false,
  data: [
    {
      name: 'Bench Press',
      muscleGroup: 'Chest',
      category: 'Barbell',
    },
  ],
  error: '',
}

const multipleExercises: IMockExercisesType = {
  loading: false,
  data: [
    {
      name: 'Bench Press',
      muscleGroup: 'Chest',
      category: 'Barbell',
    },
    {
      name: 'Calf Raise',
      muscleGroup: 'Legs',
      category: 'Bodyweight',
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

  afterEach(() => {
    jest.resetAllMocks()
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

  it('filters when a text search is present', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: {
        exercises: { ...exercises, loading: false },
        filters: {
          textSearch: 'Bench',
          category: '',
          muscleGroup: '',
        },
      },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
  })

  it('filters when a category is present', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: {
        exercises: { ...exercises, loading: false },
        filters: {
          textSearch: '',
          category: 'Barbell',
          muscleGroup: '',
        },
      },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
  })

  it('filters when a category is present', () => {
    const { getByText } = renderWithProviders(<ExercisePage />, {
      preloadedState: {
        exercises: { ...exercises, loading: false },
        filters: {
          textSearch: '',
          category: '',
          muscleGroup: 'Chest',
        },
      },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
  })
})
