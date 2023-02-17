import { render } from '@testing-library/react'
import FormGroup from '../FormGroup'

describe('<FormGroup />', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <FormGroup label="hello" id="test" error={false}>
        Test
      </FormGroup>,
    )
    expect(container).toBeInTheDocument()
  })

  it('displays error message when required', () => {
    const { getByText } = render(
      <FormGroup label="hello" id="test" error={true} errorMsg="Broken">
        Test
      </FormGroup>,
    )

    expect(getByText('Broken')).toBeInTheDocument()
  })

  it('display expected label message', () => {
    const { getByText } = render(
      <FormGroup label="test label" id="test" error={false}>
        Test
      </FormGroup>,
    )
    expect(getByText('test label')).toBeInTheDocument()
  })
})
