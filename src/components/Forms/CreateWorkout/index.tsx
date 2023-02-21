import { Input } from '@/components/FormGroup'
import Button from '@/components/Button'
import { openModal } from '@/slice/modalSlice'
import { useAppDispatch } from '@/hooks/useRedux'
import { useFormik } from 'formik'

// TODO: Create forms for workout types
// TODO: update workouts to include one of each form type
// Sets: log weight and reps
// Sets - Assisted: log assisted weight and reps
// Sets - Bodyweight: log additional weight + log reps
// Time + Distance: Log time and distance
// Time: log time
// Distance: log distance
// Reps: log reps

const CreateWorkout = () => {
  const dispatch = useAppDispatch()

  const workoutForm = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className="text-zinc-800 p-6">
      <h1 className="font-semibold text-3xl mb-2">Create a new workout</h1>

      <form onSubmit={workoutForm.handleSubmit}>
        <Input
          label="Workout Name"
          error={!!(workoutForm.errors.name && workoutForm.touched.name)}
          errorMsg={workoutForm.errors.name}
          type="text"
          id="name"
          name="name"
          placeholder="Enter workout name"
          onChange={workoutForm.handleChange}
          value={workoutForm.values.name}
          autoComplete="none"
        />
        <Button type="submit">Create Workout</Button>
      </form>

      <Button onClick={() => dispatch(openModal('addExercise'))}>
        Add Exercises
      </Button>
    </div>
  )
}

export default CreateWorkout
