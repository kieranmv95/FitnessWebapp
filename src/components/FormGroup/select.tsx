import Select, { SelectProps } from '@/components/Select'

type FormGroupProps = SelectProps & {
  errorMsg?: string
  label?: string
}

const SelectFormGroup = (props: FormGroupProps) => (
  <div className="mb-5">
    {props.label && (
      <label
        className="block uppercase tracking-wide text-zinc-800 text-sm font-bold mb-1"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    )}

    <Select
      onChange={props.onChange}
      value={props.value}
      id={props.id}
      name={props.name}
    >
      {props.children}
    </Select>

    {props.error && (
      <p className="text-red-500 font-semibold text-sm mt-1">
        {props.errorMsg}
      </p>
    )}
  </div>
)

export default SelectFormGroup
