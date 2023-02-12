import { render } from '@testing-library/react'
import Input from '../index'

describe('<Input />', () => {
  const sharedProps = {
    value: '',
    onChange: jest.fn(),
    type: 'text' as 'text' | 'password',
    placeholder: 'test',
    id: 'test',
    name: 'test',
  }

  it('renders without crashing', () => {
    const { container } = render(<Input {...sharedProps} />)
    expect(container).toBeInTheDocument()
  })

  it('when error is true it applies expected class', () => {
    const { container } = render(<Input {...sharedProps} error />)
    expect(container.firstChild).toHaveClass('border-red-500')
  })
})
