import React from 'react'
import { render } from '@testing-library/react'
import Alert from '../index'

describe('<Alert />', () => {
  it('renders without crashing', () => {
    const { container } = render(<Alert message="test" />)
    expect(container).toBeInTheDocument()
  })

  it('Displays expected message', () => {
    const { getByText } = render(<Alert message="test alert" />)
    expect(getByText('test alert')).toBeInTheDocument()
  })
})
