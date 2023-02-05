import { ReactNode } from 'react'
import cx from 'classnames'
import styles from './styles.module.scss'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  className?: string
}

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button className={cx(className, styles.button)} {...props}>
    {children}
  </button>
)

export default Button
