import { ReactNode } from 'react'
import cx from 'classnames'
import styles from './styles.module.css'

type BodyProps = {
  children: ReactNode
}
const Body = ({ children }: BodyProps) => (
  <div className={cx('p-4 md:p-6 space-y-6 text-zinc-800', styles.modalBody)}>
    {children}
  </div>
)

export default Body
