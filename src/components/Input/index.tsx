import { ChangeEvent } from 'react'
import cx from 'classnames'

export type InputProps = {
  className?: string
  error?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  type: string
  id?: string
  name: string
  placeholder?: string
  autoComplete?: string
}

const Input = ({ error, className, ...props }: InputProps) => (
  <input
    className={cx(
      'appearance-none block w-full bg-gray-100 text-zinc-800 border rounded py-1 px-2 md:py-2 md:px-3 focus:outline-none focus:bg-white focus:ring',
      className,
      error
        ? 'border-red-500 focus:ring-red-200'
        : 'border-zinc-400 focus:border-zinc-800 focus:ring-zinc-300',
    )}
    {...props}
  />
)

export default Input
