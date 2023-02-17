import Select, { SelectProps } from '@/components/Select'
import FormGroup from '@/components/FormGroup/FormGroup'

type SelectFormGroupProps = SelectProps & {
  errorMsg?: string
  label?: string
}

const SelectFormGroup = (props: SelectFormGroupProps) => (
  <FormGroup
    id={props.id}
    errorMsg={props.errorMsg}
    error={props.error}
    label={props.label}
  >
    <Select
      onChange={props.onChange}
      value={props.value}
      id={props.id}
      name={props.name}
    >
      {props.children}
    </Select>
  </FormGroup>
)

export default SelectFormGroup
