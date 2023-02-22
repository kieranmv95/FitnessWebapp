import React from 'react'
import Input from '@/components/Input'

type InputFieldProps = {
  id: string
  label?: string
  className?: string
  inputClassName?: string
  field: {
    name: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  }
  form: {
    touched: any
    errors: any
  }
}

const InputField = ({
  id,
  label,
  field,
  className,
  inputClassName,
  form: { touched, errors },
  ...props
}: InputFieldProps) => (
  <div className={className}>
    {label && (
      <label
        className="block uppercase tracking-wide text-zinc-800 text-xs md:text-sm font-bold mb-1"
        htmlFor={id}
      >
        {label}
      </label>
    )}
    <Input
      id={id}
      className={inputClassName}
      {...field}
      {...props}
      error={touched[field.name] && errors[field.name]}
    />
    {touched[field.name] && errors[field.name] && (
      <p className="text-red-500 font-semibold text-sm mt-1">
        {errors[field.name]}
      </p>
    )}
  </div>
)

export default InputField
