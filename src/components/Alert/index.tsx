import styles from './styles.module.scss'

type AlertProps = {
  message: string
}

const Alert = ({ message }: AlertProps) => (
  <div className={styles.alert}>{message}</div>
)

export default Alert
