import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../pages/index';

describe('HomePage', () => {
    it('renders without crashing', () => {
        const { container } = render(<HomePage />);
        expect(container).toBeInTheDocument();
    });

    it('renders the correct title', () => {
        const { getByText } = render(<HomePage />);
        expect(getByText('Fitness App')).toBeInTheDocument();
    });
});