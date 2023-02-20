import { useAppDispatch } from '@/hooks/useRedux'
import { closeModal } from '@/slice/modalSlice'
import cx from 'classnames'
import styles from '@/components/Modal/ModalParts/styles.module.css'
import Button from '@/components/Button'
import { Header, Footer, Body } from '@/components/Modal/ModalParts'
import Filters from '@/components/Filters'
import ExerciseList from '@/components/ExerciseList'
import { clearFilters } from '@/slice/filterSlice'
import { useEffect, useState } from 'react'

const AddExercise = () => {
  const dispatch = useAppDispatch()
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])

  const toggleSelectedExercises = (id: string) => {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== id))
    } else {
      setSelectedExercises([...selectedExercises, id])
    }
  }

  useEffect(() => {
    dispatch(clearFilters())
  }, [])

  return (
    <>
      <Header title="Add Exercise" closeModal={() => dispatch(closeModal())} />
      <Body>
        <Filters removeBorder={true} removeSticky={true} />
        <ExerciseList
          onExerciseClick={(e) => toggleSelectedExercises(e.id)}
          selectedExercises={selectedExercises}
        />
      </Body>
      <Footer>
        <Button
          onClick={() => {
            console.log('Add exercises', selectedExercises)
            dispatch(closeModal())
          }}
        >
          Add Exercises ({selectedExercises.length})
        </Button>
      </Footer>
    </>
  )
}

export default AddExercise
