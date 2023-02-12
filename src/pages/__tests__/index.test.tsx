import React from 'react'
import { render } from '@testing-library/react'
import HomePage from '../index.page'

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = render(<HomePage />)
    expect(container).toBeInTheDocument()
  })
})
