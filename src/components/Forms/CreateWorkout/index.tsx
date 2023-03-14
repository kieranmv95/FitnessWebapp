import Button from '@/components/Button'
import { Field, FieldArray, Formik } from 'formik'
import { useState } from 'react'
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

const CreateWorkout = () => {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState<IAddWorkoutFormState>({
    name: '',
    folder: 'none',
    exercises: [],
  })

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
    <div className="text-zinc-800 p-6 m-auto md:w-full md:max-w-[75rem]">
      <h1 className="font-semibold text-3xl mb-2">Create a new workout</h1>

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
              <div className="md:grid md:grid-cols-2 gap-3">
                <Field
                  label="Workout Name"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter workout name"
                  component={InputField}
                  className="mb-4"
                />

                <Field
                  label="Folder"
                  className="mb-4"
                  name="folder"
                  component={SelectField}
                >
                  <option value="none">(No Folder)</option>
                  <option value="hypertrophy">Hypertrophy</option>
                </Field>
              </div>

              <FieldArray
                name="exercises"
                render={(exercisesHelpers) => (
                  <>
                    {values.exercises.length > 0 &&
                      values.exercises.map((ex, index) => (
                        <div key={ex.id}>
                          <p className="block uppercase tracking-wide text-zinc-800 text-xs md:text-sm font-bold mb-1">
                            {ex.name}
                          </p>
                          <div className="p-4 border rounded border-zinc-400 mb-4 bg-gray-100">
                            <FieldArray
                              name={`exercises.${index}.sets`}
                              render={(setsHelpers) => (
                                <>
                                  <Button
                                    theme="primary"
                                    onClick={() =>
                                      setsHelpers.push(getSetShape(ex.form))
                                    }
                                    className="w-auto mb-2"
                                  >
                                    Add Set
                                  </Button>
                                  <Button
                                    theme="danger"
                                    onClick={() =>
                                      exercisesHelpers.remove(index)
                                    }
                                    className="w-auto ml-2"
                                  >
                                    Delete Exercise
                                  </Button>
                                  {getSetHeader(ex.equipment, ex.form)}
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

                <Button type="submit" theme="success">
                  Create Workout
                </Button>
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

export default CreateWorkout
