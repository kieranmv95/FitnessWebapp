import { ChangeEvent } from 'react'
import cx from 'classnames'

export type SelectProps = {
  error?: boolean
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  value: string
  id: string
  name: string
  children: React.ReactNode
}

const Select = ({ error, children, ...props }: SelectProps) => (
  <select
    className={cx(
      'appearance-none block w-full bg-gray-100 text-zinc-800 border rounded py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:bg-white focus:ring',
      error
        ? 'border-red-500 focus:ring-red-200'
        : 'border-zinc-400 focus:border-zinc-800 focus:ring-zinc-300',
    )}
    {...props}
  >
    {children}
  </select>
)

export default Select
