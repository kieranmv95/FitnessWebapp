import { render } from '@testing-library/react'
import Seo from '../index'

describe('Seo', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Seo title="test title" description="test description" />,
    )
    expect(container).toBeInTheDocument()
  })
})
