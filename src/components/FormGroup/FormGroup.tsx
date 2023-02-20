import { ReactNode } from 'react'

type FormGroupProps = {
  errorMsg?: string
  label?: string
  id: string
  children: ReactNode
  error?: boolean
}

const FormGroup = ({
  errorMsg,
  label,
  children,
  id,
  error,
}: FormGroupProps) => (
  <div className="mb-3 md:mb-5">
    {label && (
      <label
        className="block uppercase tracking-wide text-zinc-800 text-xs md:text-sm font-bold mb-1"
        htmlFor={id}
      >
        {label}
      </label>
    )}
    {children}
    {error && (
      <p className="text-red-500 font-semibold text-sm mt-1">{errorMsg}</p>
    )}
  </div>
)

export default FormGroup
