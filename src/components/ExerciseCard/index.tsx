import { IExercise } from '@/slice/exercisesSlice'

type ExerciseCardProps = {
  exercise: IExercise
}
const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
  <div className="p-3 shadow rounded md:px-6 md:py-4 md:shadow-md">
    <h2 className="text-sm md:text-lg font-semibold mb-2">{exercise.name}</h2>
    <div className="grid gap-1 md:inline-flex md:gap-4">
      <p className="text-xs md:text-sm">
        <span className="font-semibold">Muscle Group:</span>{' '}
        {exercise.muscleGroup.join(', ')}
      </p>
      <p className="text-xs md:text-sm">
        <span className="font-semibold">Category:</span> {exercise.category}
      </p>
      <p className="text-xs md:text-sm">
        <span className="font-semibold">Equipment:</span> {exercise.equipment}
      </p>
    </div>
  </div>
)

export default ExerciseCard
