import { ReactNode } from 'react'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick?: () => void
}

const Button = ({ children, type = 'button', ...props }: ButtonProps) => (
  <button
    type={type}
    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5 text-center"
    {...props}
  >
    {children}
  </button>
)

export default Button
