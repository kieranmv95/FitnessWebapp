import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Input } from '@/components/FormGroup'
import Button from '@/components/Button'
import Alert from '@/components/Alert'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const LoginForm = () => {
  const { login } = useFirebaseAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const loginForm = useFormik<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoginFailed(false)
      const loginRes = await login(values.email, values.password)

      if (!loginRes) {
        loginForm.resetForm()
        setLoginFailed(true)
      }
    },
  })

  return (
    <div className="mt-10 w-full max-w-sm shadow-xl px-6 py-8 rounded-md mx-auto border border-zinc-100">
      <h1 className="text-2xl font-bold mb-1">Login</h1>
      <p className="mb-5">Welcome back, please enter your details</p>
      <form onSubmit={loginForm.handleSubmit}>
        <Input
          label="Email"
          error={!!(loginForm.errors.email && loginForm.touched.email)}
          errorMsg={loginForm.errors.email}
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={loginForm.handleChange}
          value={loginForm.values.email}
          autoComplete="email"
        />

        <Input
          label="Password"
          error={!!(loginForm.errors.password && loginForm.touched.password)}
          errorMsg={loginForm.errors.password}
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
          autoComplete="current-password"
        />

        <Button type="submit">Login now</Button>
      </form>
      {loginFailed && <Alert message="Login failed" />}
    </div>
  )
}

export default LoginForm
