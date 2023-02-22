import { useState } from 'react'
import * as Yup from 'yup'
import { Field, Formik } from 'formik'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import { InputField } from '@/components/Fields'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const LoginForm = () => {
  const { login } = useFirebaseAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  return (
    <div className="mt-10 w-full max-w-sm shadow-xl px-6 py-8 rounded-md mx-auto border border-zinc-100">
      <h1 className="text-2xl font-bold mb-1">Login</h1>
      <p className="mb-5">Welcome back, please enter your details</p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, actions) => {
          setLoginFailed(false)
          const loginRes = await login(values.email, values.password)

          if (!loginRes) {
            actions.resetForm()
            setLoginFailed(true)
          }
        }}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              label="Email"
              name="email"
              type="text"
              id="email"
              placeholder="Enter email"
              className="mb-4"
              autoComplete="email"
              component={InputField}
            />

            <Field
              label="Password"
              name="password"
              type="password"
              id="password"
              placeholder="Enter password"
              autoComplete="current-password"
              className="mb-4"
              component={InputField}
            />

            <Button type="submit">Login now</Button>
          </form>
        )}
      </Formik>
      {loginFailed && <Alert message="Login failed" />}
    </div>
  )
}

export default LoginForm
