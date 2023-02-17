import { render } from '@testing-library/react'
import Loading from '../index'

describe('<PrivateRoute />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loading />)
    expect(container).toBeInTheDocument()
  })

  it('displays Loading', () => {
    const { getByText } = render(<Loading />)
    expect(getByText('Loading...')).toBeInTheDocument()
  })
})
