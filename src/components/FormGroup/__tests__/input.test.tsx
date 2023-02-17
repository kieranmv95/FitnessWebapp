import { render } from '@testing-library/react'
import FormGroup from '../input'

describe('<FormGroup />', () => {
  const sharedProps = {
    label: 'Email Label',
    type: 'text' as 'text' | 'password',
    id: 'email',
    name: 'email',
    placeholder: 'Enter email',
    onChange: () => {},
    value: '',
    autoComplete: 'email',
  }

  it('renders without crashing', () => {
    const { container } = render(<FormGroup error={false} {...sharedProps} />)
    expect(container).toBeInTheDocument()
  })

  it('displays error message when required', () => {
    const { getByText } = render(
      <FormGroup error={true} errorMsg="Email is required" {...sharedProps} />,
    )

    expect(getByText('Email is required')).toBeInTheDocument()
  })

  it('display expected label message', () => {
    const { getByText } = render(<FormGroup error={false} {...sharedProps} />)

    expect(getByText('Email Label')).toBeInTheDocument()
  })
})
