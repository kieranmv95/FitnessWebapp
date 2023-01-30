import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
})

export default function Login() {
  const { login, user, signUp } = useFirebaseAuth()
  const router = useRouter()
  const [loginView, setLoginView] = useState(true)

  useEffect(() => {
    if (!user.loading && user.loggedIn) {
      router.push('/app')
    }
  }, [user, router])

  const loginForm = useFormik<{
    email: string
    password: string
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values.email, values.password)
    },
  })

  const signUpForm = useFormik<{
    email: string
    password: string
    passwordConfirmation: string
  }>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      signUp(values.email, values.password)
    },
  })

  const renderLoginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={loginForm.handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
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
          id="password"
          name="password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
        />
        <br />
        <button type="submit">Login now</button>
      </form>
      <p
        onClick={() => {
          setLoginView(false)
          loginForm.resetForm()
        }}
      >
        Not got an account? Click to sign up
      </p>
    </>
  )

  const renderSignUpForm = () => (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={signUpForm.handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="off"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.email}
        />
        {signUpForm.errors.email && signUpForm.touched.email && (
          <div>{loginForm.errors.email}</div>
        )}
        <br />
        <br />
        <label htmlFor="password">Password</label>
        {signUpForm.errors.password && signUpForm.touched.password && (
          <div>{signUpForm.errors.password}</div>
        )}
        <br />
        <input
          type="password"
          autoComplete="off"
          id="password"
          name="password"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.password}
        />
        <br />
        <label htmlFor="password">Confirm Password</label>
        {signUpForm.errors.passwordConfirmation &&
          signUpForm.touched.passwordConfirmation && (
            <div>{signUpForm.errors.passwordConfirmation}</div>
          )}
        <br />
        <input
          type="password"
          autoComplete="off"
          id="passwordConfirmation"
          name="passwordConfirmation"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.passwordConfirmation}
        />
        <br />
        <button type="submit">Sign up now!</button>
      </form>
      <p
        onClick={() => {
          setLoginView(true)
          loginForm.resetForm()
        }}
      >
        Already got an account, click to login
      </p>
    </>
  )

  return (
    <>
      <Head>
        <title>Fitness App | Login</title>
        <meta name="description" content="Fitness App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Fitness App</h1>
        {loginView ? renderLoginForm() : renderSignUpForm()}
      </main>
    </>
  )
}
