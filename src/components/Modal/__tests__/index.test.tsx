import Modal from '../index'
import { renderWithProviders } from '../../../../test/utils'

describe('<Modal />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Modal />)
    expect(container).toBeInTheDocument()
  })
})
