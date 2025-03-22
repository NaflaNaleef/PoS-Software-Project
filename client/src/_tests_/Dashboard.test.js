import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Pages/Dashboard/Dashboard';

test('renders Dashboard component', () => {
  render(<Dashboard />);
  const element = screen.getByText(/Dashboard/i);
  expect(element).toBeInTheDocument();
});
