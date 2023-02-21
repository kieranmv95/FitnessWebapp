import React from 'react'
import CreateWorkout from '../index'
import { renderWithProviders } from '../../../../../test/utils'

describe('<CreateWorkout />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<CreateWorkout />)
    expect(container).toBeInTheDocument()
  })

  it('should render a add exercises button', () => {
    const { getByText } = renderWithProviders(<CreateWorkout />)
    expect(getByText('Add Exercises')).toBeInTheDocument()
  })
})
