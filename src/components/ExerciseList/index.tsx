import useExercise from '@/hooks/useExercise'
import { useAppSelector } from '@/hooks/useRedux'
import { IExercise } from '@/slice/exercisesSlice'
import ExerciseCard from '@/components/ExerciseCard'
import Loading from '@/components/Loading'
import AppliedFilters from '@/components/AppliedFilters'

type ExerciseListReducer = {
  [key: string]: IExercise[]
}

type ExerciseListProps = {
  onExerciseClick?: (exercise: IExercise) => void
  selectedExercises?: string[]
}

const ExerciseList = ({
  onExerciseClick,
  selectedExercises,
}: ExerciseListProps) => {
  const exerciseState = useExercise()
  const { textSearch, equipment, muscleGroup, type } = useAppSelector(
    (state) => state.filters,
  )

  if (exerciseState.loading) return <Loading />

  const exerciseList = [...exerciseState.data]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(textSearch.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(textSearch.toLowerCase()) ||
        exercise.muscleGroup.toLowerCase().includes(textSearch.toLowerCase()),
    )
    .filter((exercise) => exercise.equipment.includes(equipment))
    .filter((exercise) => exercise.muscleGroup.includes(muscleGroup))
    .filter((exercise) => exercise.type.includes(type))

  const groupExercises = (exercises: IExercise[]) => {
    const exerciseList = exercises.reduce((acc, curr) => {
      const firstLetter = curr.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = [curr]
      } else {
        acc[firstLetter].push(curr)
      }

      return acc
    }, {} as ExerciseListReducer)

    return Object.keys(exerciseList).map((key) => (
      <div key={key}>
        <p className="py-2 text-xl font-bold bg-white">{key}</p>
        <div className="py-2 grid gap-3 md:gap-6">
          {exerciseList[key].map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onExerciseClick={onExerciseClick}
              selected={selectedExercises?.includes(exercise.id)}
            />
          ))}
        </div>
      </div>
    ))
  }

  return (
    <>
      <AppliedFilters results={exerciseList.length} />
      {groupExercises(exerciseList)}
    </>
  )
}

export default ExerciseList
