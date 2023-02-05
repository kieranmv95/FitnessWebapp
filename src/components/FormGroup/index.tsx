import Input, { InputProps } from '@/components/Input'
import cx from 'classnames'
import styles from './styles.module.scss'

type FormGroupProps = InputProps & {
  errorMsg?: string
  label?: string
}

const FormGroup = (props: FormGroupProps) => (
  <div className={styles.formGroup}>
    {props.label && (
      <label
        htmlFor={props.id}
        className={cx(styles.label, props.error && styles.labelError)}
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
    {props.error && <div className={styles.copyError}>{props.errorMsg}</div>}
  </div>
)

export default FormGroup
