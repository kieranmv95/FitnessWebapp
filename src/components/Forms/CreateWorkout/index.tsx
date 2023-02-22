import Button from '@/components/Button'
import { Field, FieldArray, Formik } from 'formik'
import { useState } from 'react'
import { IExercise } from '@/slice/exercisesSlice'
import { InputField, SelectField } from '@/components/Fields'
import {
  Reps,
  WeightAndReps,
  DistanceAndTime,
} from '@/components/Forms/CreateWorkout/SetForms'
import AddExerciseModal from '@/components/AddExerciseModal'

export type IWorkoutExercise = IExercise & {
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

  const getSetShape = (category: string) => {
    switch (category) {
      case 'Dumbbell':
      case 'Barbell':
      case 'Cable':
      case 'Machine':
      case 'Kettlebell':
        return {
          weight: '',
          reps: '',
        }
      case 'Reps':
        return {
          reps: '',
        }
      case 'Cardio':
        return {
          distance: '',
          time: {
            hh: '',
            mm: '',
            ss: '',
          },
        }
      default:
        return {
          weight: '',
          reps: '',
        }
    }
  }

  const getSetHeader = (category: string) => {
    switch (category) {
      case 'Dumbbell':
      case 'Barbell':
      case 'Cable':
      case 'Machine':
      case 'Kettlebell':
        return (
          <div className="grid grid-cols-[2.125rem_1fr_1fr_2.125rem] gap-1 mb-1 text-xs font-bold">
            <p>Set</p>
            <p>KG</p>
            <p>Reps</p>
          </div>
        )
      case 'Bodyweight':
        return (
          <div className="grid grid-cols-[2.125rem_1fr_1fr_2.125rem] gap-1 mb-1 text-xs font-bold">
            <p>Set</p>
            <p>KG (+)</p>
            <p>Reps</p>
          </div>
        )
      case 'Assisted Bodyweight':
        return (
          <div className="grid grid-cols-[2.125rem_1fr_1fr_2.125rem] gap-1 mb-1 text-xs font-bold">
            <p>Set</p>
            <p>KG (-)</p>
            <p>Reps</p>
          </div>
        )
      case 'Reps':
        return (
          <div className="grid grid-cols-[2.125rem_1fr_2.125rem] gap-1 mb-1 text-xs font-bold">
            <p>Set</p>
            <p>Reps</p>
          </div>
        )
      case 'Cardio':
        return (
          <div className="grid grid-cols-[2.125rem_1fr_9rem_2.125rem] md:grid-cols-[2.125rem_1fr_15rem_2.125rem] gap-1 mb-1 text-xs font-bold">
            <p>Set</p>
            <p>Km</p>
            <p>Time</p>
          </div>
        )
      default:
        return (
          <div className="grid grid-cols-[2.125rem_1fr_1fr_2.125rem] gap-1 mb-1 text-xs font-bold">
            <p>Set</p>
            <p>KG</p>
            <p>Reps</p>
          </div>
        )
    }
  }

  const addExercises = (values: IAddWorkoutFormState, e: IExercise[]) => {
    const exerciseSets = e.map((ex) => {
      return {
        ...ex,
        sets: [getSetShape(ex.category)],
      }
    })

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
                          <div className="p-4 border rounded border-zinc-400 mb-4 bg-gray-100">
                            {getSetHeader(ex.category)}
                            <FieldArray
                              name={`exercises.${index}.sets`}
                              render={(setsHelpers) => (
                                <>
                                  {ex.sets.map((set, setIndex) => {
                                    const exerciseProps = {
                                      key: setIndex.toString(),
                                      index,
                                      setIndex,
                                      exercisesHelpers,
                                      ex,
                                      setsHelpers,
                                    }
                                    switch (ex.category) {
                                      case 'Dumbbell':
                                      case 'Barbell':
                                      case 'Cable':
                                      case 'Machine':
                                      case 'Kettlebell':
                                      case 'Bodyweight':
                                      case 'Assisted Bodyweight':
                                        return (
                                          <WeightAndReps {...exerciseProps} />
                                        )
                                      case 'Reps':
                                        return <Reps {...exerciseProps} />
                                      case 'Cardio':
                                        return (
                                          <DistanceAndTime {...exerciseProps} />
                                        )
                                      default:
                                        return (
                                          <WeightAndReps {...exerciseProps} />
                                        )
                                    }
                                  })}
                                  <Button
                                    theme="secondary"
                                    onClick={() =>
                                      setsHelpers.push(getSetShape(ex.category))
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
