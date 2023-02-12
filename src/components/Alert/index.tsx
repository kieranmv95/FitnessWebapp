type AlertProps = {
  message: string
}

const Alert = ({ message }: AlertProps) => (
  <div className="mt-4 p-3 bg-red-100 rounded border border-red-500 text-red-500">
    {message}
  </div>
)

export default Alert
