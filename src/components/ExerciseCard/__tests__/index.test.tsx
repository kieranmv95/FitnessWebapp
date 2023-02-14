import ExerciseCard from '../index'
import { render } from '@testing-library/react'
import { IExercise } from '@/slice/exercisesSlice'

const testExercise: IExercise = {
  name: 'Bench Press',
  muscleGroup: ['Chest'],
  category: 'Strength',
  equipment: 'Barbell',
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
    expect(getByText(/Strength/i)).toBeInTheDocument()
    expect(getByText(/Barbell/i)).toBeInTheDocument()
  })

  it('renders all the muscle groups', () => {
    const { getByText } = render(
      <ExerciseCard
        exercise={{ ...testExercise, muscleGroup: ['a', 'b', 'c'] }}
      />,
    )
    expect(getByText(/a, b, c/i)).toBeInTheDocument()
  })
})
