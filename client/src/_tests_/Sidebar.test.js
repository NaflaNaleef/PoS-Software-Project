import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar'; 
import '@testing-library/jest-dom/extend-expect';

describe('Sidebar Component', () => {
  test('renders all navigation links', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(getByText(/Dashboard/i)).toBeInTheDocument();
    expect(getByText(/Supplier/i)).toBeInTheDocument();
    expect(getByText(/Customer/i)).toBeInTheDocument();
    expect(getByText(/Product/i)).toBeInTheDocument();
    expect(getByText(/Sales/i)).toBeInTheDocument();
    expect(getByText(/Bills/i)).toBeInTheDocument();
    expect(getByText(/Employees/i)).toBeInTheDocument();
  });

  test('renders links with correct href attributes', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(getByText(/Dashboard/i).closest('a')).toHaveAttribute('href', '/');
    expect(getByText(/Supplier/i).closest('a')).toHaveAttribute('href', '/supplier');
    expect(getByText(/Customer/i).closest('a')).toHaveAttribute('href', '/customer');
    expect(getByText(/Product/i).closest('a')).toHaveAttribute('href', '/product');
    expect(getByText(/Sales/i).closest('a')).toHaveAttribute('href', '/sales');
    expect(getByText(/Bills/i).closest('a')).toHaveAttribute('href', '/bills');
    expect(getByText(/Employees/i).closest('a')).toHaveAttribute('href', '/employees');
  });
});
