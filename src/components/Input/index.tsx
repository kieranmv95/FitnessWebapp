import { ChangeEvent } from 'react'
import cx from 'classnames'
import styles from './styles.module.scss'

export type InputProps = {
  error?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  type: 'text' | 'password'
  id: string
  name: string
  placeholder: string
  autoComplete?: string
}

const Input = ({ error, ...props }: InputProps) => (
  <input
    {...props}
    className={cx(styles.input, !!error && styles.inputError)}
  />
)

export default Input
