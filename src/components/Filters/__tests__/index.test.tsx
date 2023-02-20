import React from 'react'
import { act, fireEvent } from '@testing-library/react'
import Filters from '../index'
import { renderWithProviders } from '../../../../test/utils'

jest.mock('next/router', () => ({
  useRouter: () => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}))

describe('<Filters />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Filters />)
    expect(container).toBeInTheDocument()
  })

  it('renders closed', () => {
    const { getByText, getByTestId } = renderWithProviders(<Filters />)

    expect(getByText('Show')).toBeInTheDocument()
    expect(getByTestId('filters-list').className).toContain('hidden')
  })

  it('toggles filters', () => {
    const { getByText, getByTestId } = renderWithProviders(<Filters />)

    const button = getByText('Show')

    act(() => {
      fireEvent.click(button)
    })

    expect(getByTestId('filters-list').className).not.toContain('hidden')
  })
})
