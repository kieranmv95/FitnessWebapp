import { ChangeEvent } from 'react'
import cx from 'classnames'

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
    className={cx(
      'appearance-none block w-full bg-gray-100 text-zinc-800 border rounded py-3 px-4 focus:outline-none focus:bg-white focus:ring',
      error
        ? 'border-red-500 focus:ring-red-200'
        : 'border-zinc-400 focus:border-zinc-800 focus:ring-zinc-300',
    )}
    {...props}
  />
)

export default Input
