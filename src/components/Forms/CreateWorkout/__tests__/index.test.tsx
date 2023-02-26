import React from 'react'
import CreateWorkout from '../index'
import { renderWithProviders } from '../../../../../test/utils'
import { act, fireEvent, waitFor } from '@testing-library/react'
import { IExercise } from '@/slice/exercisesSlice'

type IMockExercisesType = {
  loading: boolean
  data: IExercise[]
  error: string
}

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

describe('<CreateWorkout />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<CreateWorkout />)
    expect(container).toBeInTheDocument()
  })

  it('should render expected buttons', () => {
    const { getByText } = renderWithProviders(<CreateWorkout />)
    expect(getByText('Add Exercises')).toBeInTheDocument()
    expect(getByText('Create Workout')).toBeInTheDocument()
  })

  it('displays error message when form is submitted without required fields', async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <CreateWorkout />,
    )
    const button = getByText('Create Workout')

    act(() => {
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(getByText('Required')).toBeInTheDocument()
    })
  })

  describe('Renders sub form inputs', () => {
    const exercisesState: IMockExercisesType = {
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
          name: 'Bicycle',
          muscleGroup: 'Quadriceps',
          equipment: 'Machine',
          type: 'Cardio',
          form: 'DistanceAndTime',
        },
        {
          id: '3',
          name: 'Double Unders',
          muscleGroup: 'Calves',
          type: 'Cardio',
          equipment: 'Skipping Rope',
          form: 'Reps',
        },
      ],
      error: '',
    }

    it('renders a distance and time form', async () => {
      const { getByText, getByPlaceholderText, getByLabelText } =
        renderWithProviders(<CreateWorkout />, {
          preloadedState: {
            exercises: exercisesState,
          },
        })

      act(() => {
        const button = getByText('Add Exercises')
        fireEvent.click(button)
      })

      act(() => {
        const benchButton = getByLabelText('Exercise Card: Bicycle')
        fireEvent.click(benchButton)
      })

      act(() => {
        const addExerciseButton = getByText('Add Exercises (1)')
        fireEvent.click(addExerciseButton)
      })

      await act(() => {
        expect(getByPlaceholderText('distance')).toBeInTheDocument()
        expect(getByPlaceholderText('hh')).toBeInTheDocument()
        expect(getByPlaceholderText('mm')).toBeInTheDocument()
        expect(getByPlaceholderText('ss')).toBeInTheDocument()
      })
    })

    it('renders a distance and reps', async () => {
      const { getByText, getByPlaceholderText, getByLabelText } =
        renderWithProviders(<CreateWorkout />, {
          preloadedState: {
            exercises: exercisesState,
          },
        })

      act(() => {
        const button = getByText('Add Exercises')
        fireEvent.click(button)
      })

      act(() => {
        const benchButton = getByLabelText('Exercise Card: Double Unders')
        fireEvent.click(benchButton)
      })

      act(() => {
        const addExerciseButton = getByText('Add Exercises (1)')
        fireEvent.click(addExerciseButton)
      })

      await act(() => {
        expect(getByPlaceholderText('reps')).toBeInTheDocument()
      })
    })

    it('deletes a set from an exercise', async () => {
      const { getByText, getByPlaceholderText, getByLabelText, queryByText } =
        renderWithProviders(<CreateWorkout />, {
          preloadedState: {
            exercises: exercisesState,
          },
        })

      act(() => {
        const button = getByText('Add Exercises')
        fireEvent.click(button)
      })

      act(() => {
        const benchButton = getByLabelText('Exercise Card: Double Unders')
        fireEvent.click(benchButton)
      })

      act(() => {
        const addExerciseButton = getByText('Add Exercises (1)')
        fireEvent.click(addExerciseButton)
      })

      await act(() => {
        expect(getByPlaceholderText('reps')).toBeInTheDocument()
      })

      act(() => {
        const setButton = getByLabelText('Delete Set Double Unders')
        fireEvent.click(setButton)
      })

      await act(() => {
        expect(queryByText('Add Set')).not.toBeInTheDocument()
      })
    })

    it('adds a set to an exercise', async () => {
      const { getByText, getByLabelText } = renderWithProviders(
        <CreateWorkout />,
        {
          preloadedState: {
            exercises: exercisesState,
          },
        },
      )

      act(() => {
        const button = getByText('Add Exercises')
        fireEvent.click(button)
      })

      act(() => {
        const benchButton = getByLabelText('Exercise Card: Double Unders')
        fireEvent.click(benchButton)
      })

      act(() => {
        const addExerciseButton = getByText('Add Exercises (1)')
        fireEvent.click(addExerciseButton)
      })

      act(() => {
        const addSetButton = getByText('Add Set')
        fireEvent.click(addSetButton)
      })

      await act(() => {
        expect(getByText('2')).toBeInTheDocument()
      })
    })
  })
})
