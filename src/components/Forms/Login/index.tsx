import { useState } from 'react'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import * as Yup from 'yup'
import { useFormik } from 'formik'

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
    <>
      <h2>Login</h2>
      <form onSubmit={loginForm.handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          autoComplete="off"
          onChange={loginForm.handleChange}
          value={loginForm.values.email}
        />
        {loginForm.errors.email && loginForm.touched.email && (
          <div>{loginForm.errors.email}</div>
        )}
        <br />
        <br />
        <label htmlFor="password">Password</label>
        {loginForm.errors.password && loginForm.touched.password && (
          <div>{loginForm.errors.password}</div>
        )}
        <br />
        <input
          type="password"
          autoComplete="off"
          placeholder="Enter password"
          id="password"
          name="password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
        />
        <br />
        <button type="submit">Login now</button>
      </form>
      {loginFailed && (
        <div>
          <p>Login failed</p>
        </div>
      )}
    </>
  )
}

export default LoginForm
