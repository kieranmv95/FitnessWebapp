import React from 'react'
import { act, fireEvent } from '@testing-library/react'
import AppliedFilters from '../index'
import { renderWithProviders } from '../../../../test/utils'

describe('<AppliedFilters />', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<AppliedFilters results={10} />)
    expect(container).toBeInTheDocument()
  })

  it('displays expected results', () => {
    const { getByText } = renderWithProviders(<AppliedFilters results={11} />)
    expect(getByText('11')).toBeInTheDocument()
  })

  it('displays correct messaging when no results are found', () => {
    const { getByText } = renderWithProviders(<AppliedFilters results={0} />)
    expect(getByText('0')).toBeInTheDocument()
    expect(
      getByText('No exercises found for your current filter. Please try again'),
    ).toBeInTheDocument()
  })

  it('displays expected search result filter pills', () => {
    const { getByText } = renderWithProviders(<AppliedFilters results={0} />, {
      preloadedState: {
        filters: {
          textSearch: 'test search',
          muscleGroup: 'Chest',
          category: 'Barbell',
        },
      },
    })

    expect(getByText(/test search/)).toBeInTheDocument()
    expect(getByText(/Chest/)).toBeInTheDocument()
    expect(getByText(/Barbell/)).toBeInTheDocument()
  })

  it('clears search results when filter x is hit', async () => {
    const { getByText, getByLabelText, queryByText } = renderWithProviders(
      <AppliedFilters results={2} />,
      {
        preloadedState: {
          filters: {
            textSearch: 'test search',
            muscleGroup: 'Chest',
            category: 'Barbell',
          },
        },
      },
    )

    const button = getByLabelText('textSearch-clear')
    expect(getByText(/test search/)).toBeInTheDocument()

    act(() => {
      fireEvent.click(button)
    })

    expect(queryByText(/test search/)).not.toBeInTheDocument()
  })
})
