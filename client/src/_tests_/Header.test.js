import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';
import '@testing-library/jest-dom/extend-expect';

describe('Header Component', () => {
  test('renders the Header component', () => {
    render(<Header />);
    
    // Check if the heading is present
    const headingElement = screen.getByText(/Employee/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('has the correct class name', () => {
    render(<Header />);
    
    // Check if the div contains the class name "header"
    const headerDiv = screen.getByRole('heading', { level: 1 }).parentElement;
    expect(headerDiv).toHaveClass('header');
  });
});
