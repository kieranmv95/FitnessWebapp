import React from 'react'
import Select from '@/components/Select'

type SelectFieldProps = {
  children: React.ReactNode
  id: string
  label?: string
  className?: string
  inputClassName?: string
  field: {
    name: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void
  }
  form: {
    touched: any
    errors: any
  }
}

const SelectField = ({
  id,
  label,
  field,
  className,
  inputClassName,
  children,
  form: { touched, errors },
  ...props
}: SelectFieldProps) => (
  <div className={className}>
    {label && (
      <label
        className="block uppercase tracking-wide text-zinc-800 text-xs md:text-sm font-bold mb-1"
        htmlFor={id}
      >
        {label}
      </label>
    )}
    <Select
      id={id}
      className={inputClassName}
      {...field}
      {...props}
      error={touched[field.name] && errors[field.name]}
    >
      {children}
    </Select>
    {touched[field.name] && errors[field.name] && (
      <p className="text-red-500 font-semibold text-sm mt-1">
        {errors[field.name]}
      </p>
    )}
  </div>
)

export default SelectField
