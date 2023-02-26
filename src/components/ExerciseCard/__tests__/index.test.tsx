import ExerciseCard from '../index'
import { fireEvent, render } from '@testing-library/react'
import { IExercise } from '@/slice/exercisesSlice'

const testExercise: IExercise = {
  id: '1',
  name: 'Bench Press',
  muscleGroup: 'Chest',
  equipment: 'Barbell',
  type: 'Strength',
  form: 'WeightAndReps',
}

describe('<ExerciseCard />', () => {
  it('renders without crashing', () => {
    const { container } = render(<ExerciseCard exercise={testExercise} />)
    expect(container).toBeInTheDocument()
  })

  it('displays expected content', () => {
    const { getByText } = render(<ExerciseCard exercise={testExercise} />)
    expect(getByText(/Bench Press/i)).toBeInTheDocument()
    expect(getByText(/Chest/i)).toBeInTheDocument()
    expect(getByText(/Barbell/i)).toBeInTheDocument()
  })

  it('calls on exercise click function', () => {
    const mockCall = jest.fn()
    const { getByLabelText } = render(
      <ExerciseCard exercise={testExercise} onExerciseClick={mockCall} />,
    )
    const button = getByLabelText('Exercise Card: Bench Press')

    fireEvent.click(button)

    expect(mockCall).toHaveBeenCalledWith(testExercise)
  })

  it('applies expected selected color', () => {
    const { getByLabelText } = render(
      <ExerciseCard exercise={testExercise} selected={true} />,
    )

    const exercise = getByLabelText('Exercise Card: Bench Press')
    expect(exercise.classList).toContain('bg-blue-500')
  })
})
