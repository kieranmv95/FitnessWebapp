import { ReactNode } from 'react'
import cx from 'classnames'

type ButtonProps = {
  theme?: 'primary' | 'secondary' | 'success' | 'danger'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick?: () => void
}

const Button = ({
  theme = 'primary',
  children,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  const getTheme = () => {
    switch (theme) {
      case 'primary':
        return 'text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
      case 'secondary':
        return 'text-white bg-zinc-800 hover:bg-zinc-900 focus:ring-4 focus:ring-zinc-400 hover:text-whitex'
      case 'success':
        return 'text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 hover:text-whitex'
      case 'danger':
        return 'text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 hover:text-whitex'
      default:
        return 'text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
    }
  }

  return (
    <button
      type={type}
      className={cx(
        'focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5 text-center',
        getTheme(),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
