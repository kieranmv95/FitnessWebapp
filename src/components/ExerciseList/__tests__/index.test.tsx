import React from 'react'
import ExerciseList from '../index'
import { renderWithProviders } from '../../../../test/utils'
import { IExercise } from '@/slice/exercisesSlice'

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

type IMockExercisesType = {
  loading: boolean
  data: IExercise[]
  error: string
}

const exercises: IMockExercisesType = {
  loading: false,
  data: [
    {
      id: '1',
      name: 'Bench Press',
      muscleGroup: 'Chest',
      equipment: 'Barbell',
      type: 'Strength',
      form: 'WeightAndReps',
    },
  ],
  error: '',
}

const multipleExercises: IMockExercisesType = {
  loading: false,
  data: [
    {
      id: '1',
      name: 'Bench Press',
      muscleGroup: 'Chest',
      equipment: 'Barbell',
      type: 'Strength',
      form: 'WeightAndReps',
    },
    {
      id: '2',
      name: 'Calf Raise',
      muscleGroup: 'Calves',
      equipment: 'Bodyweight',
      type: 'Strength',
      form: 'WeightAndReps',
    },
  ],
  error: '',
}

describe('<ExerciseList />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<ExerciseList />)
    expect(container).toBeInTheDocument()
  })

  it('renders an exercise', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: { exercises },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
  })

  it('renders multiple exercise', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: { exercises: multipleExercises },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('Calf Raise')).toBeInTheDocument()
  })

  it('renders the header letter', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: { exercises: exercises },
    })

    expect(getByText('B')).toBeInTheDocument()
  })

  it('renders multiple header letters', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: { exercises: multipleExercises },
    })

    expect(getByText('B')).toBeInTheDocument()
    expect(getByText('C')).toBeInTheDocument()
  })

  it('displays loading if exercises are not loaded', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: { exercises: { ...exercises, loading: true } },
    })

    expect(getByText('Loading...')).toBeInTheDocument()
  })

  it('filters when a text search is present', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: {
        exercises: { ...exercises, loading: false },
        filters: {
          textSearch: 'Bench',
          equipment: '',
          type: '',
          muscleGroup: '',
        },
      },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
  })

  it('filters when a category is present', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: {
        exercises: { ...exercises, loading: false },
        filters: {
          textSearch: '',
          equipment: 'Barbell',
          type: '',
          muscleGroup: '',
        },
      },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
  })

  it('filters when a category is present', () => {
    const { getByText } = renderWithProviders(<ExerciseList />, {
      preloadedState: {
        exercises: { ...exercises, loading: false },
        filters: {
          textSearch: '',
          equipment: '',
          type: 'Strength',
          muscleGroup: 'Chest',
        },
      },
    })

    expect(getByText('Bench Press')).toBeInTheDocument()
    expect(getByText('1')).toBeInTheDocument()
  })

  it('calls onExerciseClick when an exercise is clicked', () => {
    const onExerciseClick = jest.fn()
    const { getByLabelText } = renderWithProviders(
      <ExerciseList onExerciseClick={onExerciseClick} />,
      {
        preloadedState: {
          exercises: { ...exercises, loading: false },
          filters: {
            textSearch: '',
            equipment: '',
            type: '',
            muscleGroup: 'Chest',
          },
        },
      },
    )

    getByLabelText('Exercise Card: Bench Press').click()
    expect(onExerciseClick).toHaveBeenCalledWith(exercises.data[0])
  })
})
