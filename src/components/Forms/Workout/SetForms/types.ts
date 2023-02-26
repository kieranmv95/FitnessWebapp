import { FieldArrayRenderProps } from 'formik'
import { IWorkoutExercise } from '@/components/Forms/CreateWorkout'

export type SetsTypeProps = {
  index: number
  setIndex: number
  exercisesHelpers: FieldArrayRenderProps
  ex: IWorkoutExercise
  setsHelpers: FieldArrayRenderProps
}
