import Header from '../Header'
import { fireEvent, render } from '@testing-library/react'

describe('<Header />', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Header title="Test" closeModal={() => jest.fn()} />,
    )
    expect(container).toBeInTheDocument()
  })

  it('renders expected title', () => {
    const { getByText } = render(
      <Header title="Test" closeModal={() => jest.fn()} />,
    )
    expect(getByText('Test')).toBeInTheDocument()
  })

  it('Calls close modal', () => {
    const closeModal = jest.fn()
    const { getByRole } = render(
      <Header title="Test" closeModal={closeModal} />,
    )
    const button = getByRole('button')
    fireEvent.click(button)

    expect(closeModal).toHaveBeenCalled()
  })
})
