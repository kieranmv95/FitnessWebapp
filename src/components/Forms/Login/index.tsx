import { useState } from 'react'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import styles from './styles.module.scss'
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
    <div className={styles.form}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.subtitle}>Welcome back, please enter your details</p>
      <form onSubmit={loginForm.handleSubmit}>
        <FormGroup
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

        <FormGroup
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

        <Button className={styles.button} type="submit">
          Login now
        </Button>
      </form>
      {loginFailed && <Alert message="Login failed" />}
    </div>
  )
}

export default LoginForm
