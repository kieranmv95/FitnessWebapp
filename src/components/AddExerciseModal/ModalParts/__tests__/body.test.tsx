import Body from '../Body'
import { render } from '@testing-library/react'

describe('<Body />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Body>Test</Body>)
    expect(container).toBeInTheDocument()
  })

  it('renders expected children', () => {
    const { getByText } = render(<Body>Test</Body>)
    expect(getByText('Test')).toBeInTheDocument()
  })
})
