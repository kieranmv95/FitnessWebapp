import { ReactNode } from 'react'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick?: () => void
}

const Button = ({ children, type = 'button', ...props }: ButtonProps) => (
  <button
    type={type}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline focus:ring"
    {...props}
  >
    {children}
  </button>
)

export default Button
