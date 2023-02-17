import ExerciseCard from '../index'
import { render } from '@testing-library/react'
import { IExercise } from '@/slice/exercisesSlice'

const testExercise: IExercise = {
  name: 'Bench Press',
  muscleGroup: 'Chest',
  category: 'Barbell',
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
})
