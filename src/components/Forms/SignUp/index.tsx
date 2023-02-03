import { useState } from 'react'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
})

const SignUpForm = () => {
  const { signUp } = useFirebaseAuth()
  const [signUpFailed, setSignUpFailed] = useState(false)

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
    onSubmit: async (values) => {
      setSignUpFailed(false)
      const signUpResult = await signUp(values.email, values.password)

      if (!signUpResult) {
        signUpForm.resetForm()
        setSignUpFailed(true)
      }
    },
  })

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={signUpForm.handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          id="email"
          placeholder="Enter email"
          name="email"
          autoComplete="off"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.email}
        />
        {signUpForm.errors.email && signUpForm.touched.email && (
          <div>{signUpForm.errors.email}</div>
        )}
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          autoComplete="off"
          id="password"
          placeholder="Enter password"
          name="password"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.password}
        />
        {signUpForm.errors.password && signUpForm.touched.password && (
          <div>{signUpForm.errors.password}</div>
        )}
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
          placeholder="Confirm password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.passwordConfirmation}
        />
        <br />
        <button type="submit">Sign up now!</button>
      </form>
      {signUpFailed && (
        <div>
          <p>Signup failed</p>
        </div>
      )}
    </>
  )
}

export default SignUpForm
