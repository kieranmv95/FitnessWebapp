import React from 'react'
import { render } from '@testing-library/react'
import HomePage from '../index.page'

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { container } = render(<HomePage />)
    expect(container).toBeInTheDocument()
  })

  it('renders the correct title', () => {
    const { getByText } = render(<HomePage />)
    expect(getByText('Fitness App')).toBeInTheDocument()
  })

  it('renders login link', () => {
    const { getByText } = render(<HomePage />)
    expect(getByText('Login')).toBeInTheDocument()
  })
})
