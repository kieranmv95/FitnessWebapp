import { render } from '@testing-library/react'
import Select from '../index'

describe('<Select />', () => {
  const sharedProps = {
    value: '',
    onChange: jest.fn(),
    id: 'test',
    name: 'test',
  }

  it('renders without crashing', () => {
    const { container } = render(
      <Select {...sharedProps}>
        <option>yes</option>
      </Select>,
    )
    expect(container).toBeInTheDocument()
  })

  it('when error is true it applies expected class', () => {
    const { container } = render(
      <Select {...sharedProps} error>
        <option>yes</option>
      </Select>,
    )
    expect(container.firstChild).toHaveClass('border-red-500')
  })
})
