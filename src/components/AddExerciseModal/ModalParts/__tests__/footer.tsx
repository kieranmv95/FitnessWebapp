import Footer from '../Body'
import { render } from '@testing-library/react'

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer>Test</Footer>)
    expect(container).toBeInTheDocument()
  })

  it('renders expected children', () => {
    const { getByText } = render(<Footer>Test</Footer>)
    expect(getByText('Test')).toBeInTheDocument()
  })
})
