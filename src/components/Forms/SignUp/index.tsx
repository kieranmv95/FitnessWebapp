import { useState } from 'react'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormGroup from '@/components/FormGroup'
import Button from '@/components/Button'
import styles from './styles.module.scss'
import Alert from '@/components/Alert'

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
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
    <div className={styles.form}>
      <h2 className={styles.title}>Sign Up</h2>
      <p className={styles.subtitle}>Sign up for free now!</p>
      <form onSubmit={signUpForm.handleSubmit}>
        <FormGroup
          label="Email"
          error={!!(signUpForm.errors.email && signUpForm.touched.email)}
          errorMsg={signUpForm.errors.email}
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.email}
          autoComplete="email"
        />
        <FormGroup
          label="Password"
          error={!!(signUpForm.errors.password && signUpForm.touched.password)}
          errorMsg={signUpForm.errors.password}
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.password}
          autoComplete="new-password"
        />
        <FormGroup
          label="Confirm Password"
          error={
            !!(
              signUpForm.errors.passwordConfirmation &&
              signUpForm.touched.passwordConfirmation
            )
          }
          errorMsg={signUpForm.errors.passwordConfirmation}
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          placeholder="Confirm password"
          onChange={signUpForm.handleChange}
          value={signUpForm.values.passwordConfirmation}
          autoComplete="new-password"
        />
        <Button className={styles.button} type="submit">
          Sign up now!
        </Button>
      </form>
      {signUpFailed && <Alert message="Signup failed" />}
    </div>
  )
}

export default SignUpForm
