import AddExerciseModal from '../index'
import { renderWithProviders } from '../../../../test/utils'
import { fireEvent } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

describe('<AddExerciseModal />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(
      <AddExerciseModal
        open={true}
        close={() => jest.fn()}
        onExerciseAdd={(e) => jest.fn()}
      />,
    )
    expect(container).toBeInTheDocument()
  })

  it('doesnt render when open is false', () => {
    const { queryByText } = renderWithProviders(
      <AddExerciseModal
        open={false}
        close={() => jest.fn()}
        onExerciseAdd={(e) => jest.fn()}
      />,
    )
    expect(queryByText(/Add Exercise/)).not.toBeInTheDocument()
  })

  it('renders when open is true', () => {
    const { getByText } = renderWithProviders(
      <AddExerciseModal
        open={true}
        close={() => jest.fn()}
        onExerciseAdd={(e) => jest.fn()}
      />,
    )
    expect(getByText('Add Exercise')).toBeInTheDocument()
  })

  it('fires the expected callback on close', () => {
    const closeFn = jest.fn()

    const { getAllByRole } = renderWithProviders(
      <AddExerciseModal
        open={true}
        close={closeFn}
        onExerciseAdd={(e) => jest.fn()}
      />,
    )

    const button = getAllByRole('button')
    fireEvent.click(button[0])

    expect(closeFn).toHaveBeenCalled()
  })

  it('passes back the expected exercise', () => {
    const exerciseClick = jest.fn()

    const { getByLabelText, getByText } = renderWithProviders(
      <AddExerciseModal
        open={true}
        close={() => jest.fn()}
        onExerciseAdd={exerciseClick}
      />,
      {
        preloadedState: {
          exercises: {
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
          },
        },
      },
    )

    const exercise = getByLabelText('Exercise Card: Bench Press')
    fireEvent.click(exercise)

    const exerciseAdd = getByText('Add Exercises (1)')
    fireEvent.click(exerciseAdd)

    expect(exerciseClick).toHaveBeenCalled()
  })
})
