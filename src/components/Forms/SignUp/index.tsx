import { useState } from 'react'
import * as Yup from 'yup'
import { Field, Formik } from 'formik'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import { InputField } from '@/components/Fields'
import useStrapiAuth from '@/hooks/useStrapiAuth'

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must be at least 8 characters, contain a special character, uppercase, lowercase and a number',
    )
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const SignUpForm = () => {
  const { signUp } = useStrapiAuth()
  const [signUpFailed, setSignUpFailed] = useState(false)

  return (
    <div className="mt-10 w-full max-w-sm shadow-xl px-6 py-8 rounded-md mx-auto border border-zinc-100">
      <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
      <p className="mb-5">Sign up for free now!</p>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={async (values, actions) => {
          setSignUpFailed(false)
          const signUpResult = await signUp(
            values.username,
            values.email,
            values.password,
          )

          if (!signUpResult) {
            actions.resetForm()
            setSignUpFailed(true)
          }
        }}
        validationSchema={SignUpSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              label="Username"
              name="username"
              type="text"
              id="username"
              placeholder="Enter username"
              className="mb-4"
              autoComplete="username"
              component={InputField}
            />
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
              autoComplete="new-password"
              className="mb-4"
              component={InputField}
            />
            <Field
              label="Confirm Password"
              name="passwordConfirmation"
              type="password"
              id="passwordConfirmation"
              placeholder="Confirm password"
              autoComplete="new-password"
              className="mb-4"
              component={InputField}
            />
            <Button type="submit">Sign up now!</Button>
          </form>
        )}
      </Formik>
      {signUpFailed && <Alert message="Signup failed" />}
    </div>
  )
}

export default SignUpForm
