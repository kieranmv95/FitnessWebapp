import { Input } from '@/components/FormGroup'
import Button from '@/components/Button'
import { Formik } from 'formik'
import AddExerciseModal from '@/components/AddExerciseModal'
import { useState } from 'react'
import { IExercise } from '@/slice/exercisesSlice'

// TODO: Create forms for workout types
// TODO: update workouts to include one of each form type
// Sets: log weight and reps
// Sets - Assisted: log assisted weight and reps
// Sets - Bodyweight: log additional weight + log reps
// Time + Distance: Log time and distance
// Time: log time
// Distance: log distance
// Reps: log reps

type IAddWorkoutFormState = {
  name: string
  exercises: IExercise[]
}

const CreateWorkout = () => {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState<IAddWorkoutFormState>({
    name: '',
    exercises: [],
  })

  const addExercises = (values: IAddWorkoutFormState, e: IExercise[]) => {
    setFormState({ ...values, exercises: [...values.exercises, ...e] })
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
              <Input
                label="Workout Name"
                error={!!(errors.name && touched.name)}
                errorMsg={errors.name}
                type="text"
                id="name"
                name="name"
                placeholder="Enter workout name"
                onChange={handleChange}
                value={values.name}
                autoComplete="none"
              />

              <Button onClick={() => setOpen(true)}>Add Exercises</Button>

              <br />
              <br />

              <Button type="submit">Create Workout</Button>
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
