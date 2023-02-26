import { IExercise } from '@/slice/exercisesSlice'
import cx from 'classnames'

type ExerciseCardProps = {
  exercise: IExercise
  onExerciseClick?: (exercise: IExercise) => void
  selected?: boolean
}
const ExerciseCard = ({
  exercise,
  onExerciseClick,
  selected,
}: ExerciseCardProps) => (
  <div
    aria-label={`Exercise Card: ${exercise.name}`}
    className={cx(
      'p-3 shadow rounded md:px-6 md:py-4 md:shadow-md cursor-pointer hover:shadow-lg',
      selected && 'bg-blue-500 text-zinc-100',
    )}
    onClick={() => onExerciseClick?.(exercise)}
  >
    <h2 className="text-sm md:text-lg font-semibold mb-2">{exercise.name}</h2>
    <div className="grid gap-1 md:inline-flex md:gap-4">
      <p className="text-xs md:text-sm">
        <span className="font-semibold">Muscle Group:</span>{' '}
        {exercise.muscleGroup}
      </p>
      <p className="text-xs md:text-sm">
        <span className="font-semibold">Category:</span> {exercise.equipment}
      </p>
    </div>
  </div>
)

export default ExerciseCard
