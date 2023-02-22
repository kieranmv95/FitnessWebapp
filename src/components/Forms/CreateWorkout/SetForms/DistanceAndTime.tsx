import { Field } from 'formik'
import { InputField } from '@/components/Fields'
import { TrashIcon } from '@heroicons/react/24/solid'
import { SetsTypeProps } from '@/components/Forms/CreateWorkout/SetForms/types'

const DistanceAndTime = ({
  index,
  setIndex,
  exercisesHelpers,
  ex,
  setsHelpers,
}: SetsTypeProps) => (
  <div
    key={setIndex}
    className="grid grid-cols-[2.125rem_1fr_9rem_2.125rem] md:grid-cols-[2.125rem_1fr_15rem_2.125rem] gap-1 mb-1"
  >
    <p className="text-zinc-600 py-1 px-2 md:py-2 md:px-3 rounded inline-block font-bold text-center bg-white">
      {setIndex + 1}
    </p>
    <Field
      type="number"
      name={`exercises.${index}.sets.${setIndex}.distance`}
      placeholder="distance"
      inputClassName="bg-white"
      component={InputField}
    />
    <div className="grid grid-cols-3">
      <Field
        type="number"
        name={`exercises.${index}.sets.${setIndex}.time.hh`}
        placeholder="hh"
        inputClassName="bg-white"
        component={InputField}
      />
      <Field
        type="number"
        name={`exercises.${index}.sets.${setIndex}.time.mm`}
        placeholder="mm"
        inputClassName="bg-white"
        component={InputField}
      />
      <Field
        type="number"
        name={`exercises.${index}.sets.${setIndex}.time.ss`}
        placeholder="ss"
        inputClassName="bg-white"
        component={InputField}
      />
    </div>
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
)

export default DistanceAndTime
