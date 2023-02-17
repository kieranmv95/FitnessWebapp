import Input, { InputProps } from '@/components/Input'
import FormGroup from '@/components/FormGroup/FormGroup'

type InputFormGroupProps = InputProps & {
  errorMsg?: string
  label?: string
}

const InputFormGroup = (props: InputFormGroupProps) => (
  <FormGroup
    id={props.id}
    errorMsg={props.errorMsg}
    error={props.error}
    label={props.label}
  >
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
  </FormGroup>
)

export default InputFormGroup
