import Button from '../index'
import { render } from '@testing-library/react'

describe('<Button />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button>Test</Button>)
    expect(container).toBeInTheDocument()
  })

  it('Calls onClick when clicked', () => {
    const onClickMock = jest.fn()
    const { getByText } = render(<Button onClick={onClickMock}>Test</Button>)

    getByText('Test').click()
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('Renders expected content', () => {
    const { getByText } = render(<Button>Test Button</Button>)
    expect(getByText('Test Button')).toBeInTheDocument()
  })
})
