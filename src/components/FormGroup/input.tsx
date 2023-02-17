import Input, { InputProps } from '@/components/Input'

type FormGroupProps = InputProps & {
  errorMsg?: string
  label?: string
}

const InputFormGroup = (props: FormGroupProps) => (
  <div className="mb-5">
    {props.label && (
      <label
        className="block uppercase tracking-wide text-zinc-800 text-sm font-bold mb-1"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    )}
    <Input
      error={props.error}
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      autoComplete={props.autoComplete}
    />
    {props.error && (
      <p className="text-red-500 font-semibold text-sm mt-1">
        {props.errorMsg}
      </p>
    )}
  </div>
)

export default InputFormGroup
