import Button from '@/components/Button'
import { Field, FieldArray, Formik } from 'formik'
import AddExerciseModal from '@/components/AddExerciseModal'
import { useState } from 'react'
import { IExercise } from '@/slice/exercisesSlice'
import { InputField, SelectField } from '@/components/Fields'
import { TrashIcon } from '@heroicons/react/24/solid'

type IWorkoutExercise = IExercise & {
  sets: any[]
}

type IAddWorkoutFormState = {
  name: string
  folder: string
  exercises: IWorkoutExercise[]
}

const CreateWorkout = () => {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState<IAddWorkoutFormState>({
    name: '',
    folder: 'none',
    exercises: [],
  })

  const addExercises = (values: IAddWorkoutFormState, e: IExercise[]) => {
    const exerciseSets = e.map((ex) => ({
      ...ex,
      sets: [
        {
          weight: '',
          reps: '',
        },
      ],
    }))

    setFormState({
      ...values,
      exercises: [...values.exercises, ...exerciseSets],
    })
  }

  return (
    <div className="text-zinc-800 p-6">
      <h1 className="font-semibold text-3xl mb-2">Create a new workout</h1>

      <Formik
        initialValues={formState}
        enableReinitialize={true}
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
                          <FieldArray
                            name={`exercises.${index}.sets`}
                            render={(setsHelpers) => (
                              <div className="p-4 border rounded border-zinc-400 mb-4 bg-gray-100">
                                {ex.sets.map((set, setIndex) => (
                                  <div
                                    key={setIndex}
                                    className="grid grid-cols-[auto_1fr_1fr_auto] gap-1 mb-1"
                                  >
                                    <p className="text-zinc-600 py-1 px-2 md:py-2 md:px-3 rounded inline-block font-bold">
                                      {setIndex + 1}
                                    </p>
                                    <Field
                                      type="text"
                                      name={`exercises.${index}.sets.${setIndex}.weight`}
                                      placeholder="weight"
                                      inputClassName="bg-white"
                                      component={InputField}
                                    />
                                    <Field
                                      type="text"
                                      name={`exercises.${index}.sets.${setIndex}.reps`}
                                      placeholder="reps"
                                      inputClassName="bg-white"
                                      component={InputField}
                                    />
                                    <div
                                      className="text-red-500 border border-red-500 rounded bg-red-100 flex items-center px-2"
                                      onClick={() => {
                                        if (ex.sets.length === 1) {
                                          exercisesHelpers.remove(index)
                                        } else {
                                          setsHelpers.remove(setIndex)
                                        }
                                      }}
                                    >
                                      <TrashIcon className="w-4 h-4" />
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  theme="secondary"
                                  onClick={() =>
                                    setsHelpers.push({
                                      weight: '',
                                      reps: '',
                                    })
                                  }
                                  className="w-full mt-2"
                                >
                                  Add Set
                                </Button>
                              </div>
                            )}
                          />
                        </div>
                      ))}
                  </>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setOpen(true)}>Add Exercises</Button>

                <Button type="submit">Create Workout</Button>
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
