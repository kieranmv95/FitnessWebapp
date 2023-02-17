import { render } from '@testing-library/react'
import FormGroup from '../select'

describe('<FormGroup />', () => {
  const sharedProps = {
    label: 'Select Label',
    id: 'email',
    name: 'email',
    onChange: () => {},
    value: '',
    autoComplete: 'email',
  }

  it('renders without crashing', () => {
    const { container } = render(
      <FormGroup error={false} {...sharedProps}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </FormGroup>,
    )
    expect(container).toBeInTheDocument()
  })

  it('displays error message when required', () => {
    const { getByText } = render(
      <FormGroup error={true} errorMsg="Failed" {...sharedProps}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </FormGroup>,
    )

    expect(getByText('Failed')).toBeInTheDocument()
  })

  it('display expected label message', () => {
    const { getByText } = render(
      <FormGroup error={false} {...sharedProps}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </FormGroup>,
    )

    expect(getByText('Select Label')).toBeInTheDocument()
  })
})
