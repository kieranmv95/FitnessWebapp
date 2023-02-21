import { IExercise } from '@/slice/exercisesSlice'
import { Body, Footer, Header } from '@/components/AddExerciseModal/ModalParts'
import Filters from '@/components/Filters'
import ExerciseList from '@/components/ExerciseList'
import Button from '@/components/Button'
import { useAppDispatch } from '@/hooks/useRedux'
import { useEffect, useState } from 'react'
import { clearFilters } from '@/slice/filterSlice'

type AddExerciseModalProps = {
  open: boolean
  close: () => void
  onExerciseAdd: (exercises: IExercise[]) => void
}

const AddExerciseModal = ({
  open,
  close,
  onExerciseAdd,
}: AddExerciseModalProps) => {
  const dispatch = useAppDispatch()
  const [selectedExercises, setSelectedExercises] = useState<IExercise[]>([])

  const toggleSelectedExercises = (exercise: IExercise) => {
    const selectedExercisesIndex = selectedExercises.find(
      (e) => e.id === exercise.id,
    )

    if (!!selectedExercisesIndex) {
      setSelectedExercises(
        selectedExercises.filter((e) => e.id !== exercise.id),
      )
    } else {
      setSelectedExercises([...selectedExercises, exercise])
    }
  }

  useEffect(() => {
    dispatch(clearFilters())
  }, [])

  if (!open) return null

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 h-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal bg-black bg-opacity-70"
      onClick={close}
    >
      <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
        <div
          className="relative bg-white rounded-lg shadow "
          onClick={(e) => e.stopPropagation()}
        >
          <Header title="Add Exercise" closeModal={close} />
          <Body>
            <Filters removeBorder={true} removeSticky={true} />
            <ExerciseList
              onExerciseClick={(e) => toggleSelectedExercises(e)}
              selectedExercises={selectedExercises.map((e) => e.id)}
            />
          </Body>
          <Footer>
            <Button
              onClick={() => {
                onExerciseAdd(selectedExercises)
                setSelectedExercises([])
                close()
              }}
            >
              Add Exercises ({selectedExercises.length})
            </Button>
          </Footer>
        </div>
      </div>
    </div>
  )
}

export default AddExerciseModal
