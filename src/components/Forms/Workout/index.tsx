import Button from '@/components/Button'
import { Field, FieldArray, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { IExercise } from '@/slice/exercisesSlice'
import { InputField, SelectField } from '@/components/Fields'
import * as SetForms from '@/components/Forms/CreateWorkout/SetForms'
import AddExerciseModal from '@/components/AddExerciseModal'
import * as Yup from 'yup'
import {
  getSetHeader,
  getSetShape,
  getSetComponent,
} from '@/components/Forms/CreateWorkout/helpers'
import { IWorkout } from '@/slice/workoutSlice'

export type IWorkoutExercise = IExercise & {
  sets: any[]
}

type IAddWorkoutFormState = {
  name: string
  folder: string
  exercises: IWorkoutExercise[]
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  folder: Yup.string().required('Required'),
  exercises: Yup.array(),
})

type WorkoutProps = {
  data: IWorkout
}

const Workout = ({ data }: WorkoutProps) => {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState<IAddWorkoutFormState>(data)

  useEffect(() => {
    // ALTER THE SHAPE OF THE EXERCISES TO ADD CHECKBOXES TO ALL THE SETS
  }, [])

  const addExercises = (values: IAddWorkoutFormState, e: IExercise[]) => {
    const exerciseSets = e.map((ex) => {
      return {
        ...ex,
        sets: [getSetShape(ex.form)],
      }
    })

    setFormState({
      ...values,
      exercises: [...values.exercises, ...exerciseSets],
    })
  }

  return (
    <div className="text-zinc-800 p-6">
      <Formik
        initialValues={formState}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ values, handleChange, errors, touched, handleSubmit }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h1 className="text-2xl font-bold">{values.name}</h1>
                <p>{values.folder}</p>
              </div>

              <FieldArray
                name="exercises"
                render={(exercisesHelpers) => (
                  <>
                    {values.exercises.length > 0 &&
                      values.exercises.map((ex, index) => (
                        <div key={index}>
                          <p className="block uppercase tracking-wide text-zinc-800 text-xs md:text-sm font-bold mb-1">
                            {ex.name}
                          </p>
                          <div className="p-4 border rounded border-zinc-400 mb-4 bg-gray-100">
                            {getSetHeader(ex.equipment, ex.form)}
                            <FieldArray
                              name={`exercises.${index}.sets`}
                              render={(setsHelpers) => (
                                <>
                                  {ex.sets.map((set, setIndex) => {
                                    const exerciseProps = {
                                      index,
                                      setIndex,
                                      exercisesHelpers,
                                      ex,
                                      setsHelpers,
                                    }

                                    const Component =
                                      SetForms[getSetComponent(ex.form)]

                                    return (
                                      <Component
                                        key={setIndex}
                                        {...exerciseProps}
                                      />
                                    )
                                  })}
                                  <Button
                                    theme="secondary"
                                    onClick={() =>
                                      setsHelpers.push(getSetShape(ex.form))
                                    }
                                    className="w-full mt-2"
                                  >
                                    Add Set
                                  </Button>
                                </>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                  </>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setOpen(true)}>Add Exercises</Button>

                <Button type="submit">Finish Workout</Button>
              </div>
            </form>
            <AddExerciseModal
              open={open}
              close={() => setOpen(false)}
              onExerciseAdd={(e) => addExercises(values, e)}
            />
          </>
        )}
      </Formik>
    </div>
  )
}

export default Workout
