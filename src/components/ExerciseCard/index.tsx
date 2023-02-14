import { IExercise } from '@/slice/exercisesSlice'

type ExerciseCardProps = {
  exercise: IExercise
}
const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
  <div className="px-3 py-2 shadow rounded">
    <h2 className="text-sm font-semibold mb-1">{exercise.name}</h2>
    <p className="text-xs">Muscle Group: {exercise.muscleGroup.join(', ')}</p>
    <p className="text-xs">Category: {exercise.category}</p>
    <p className="text-xs">Equipment: {exercise.equipment}</p>
  </div>
)

export default ExerciseCard
