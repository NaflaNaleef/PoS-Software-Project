import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductForm from '../components/ProductForm/ProductForm'; // Adjust path accordingly

describe('ProductForm Component', () => {
    const mockOnSave = jest.fn();
    const mockResetForm = jest.fn();

    beforeEach(() => {
        mockOnSave.mockClear();
        mockResetForm.mockClear();
    });

    test('renders form fields correctly', () => {
        render(<ProductForm onSave={mockOnSave} resetForm={mockResetForm} />);

        expect(screen.getByPlaceholderText('Product Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Product Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    test('updates input values on change', () => {
        render(<ProductForm onSave={mockOnSave} resetForm={mockResetForm} />);

        const nameInput = screen.getByPlaceholderText('Product Name');
        fireEvent.change(nameInput, { target: { value: 'Test Product' } });
        expect(nameInput.value).toBe('Test Product');

        const priceInput = screen.getByPlaceholderText('Price');
        fireEvent.change(priceInput, { target: { value: '10.5' } });
        expect(priceInput.value).toBe('10.5');

        const quantityInput = screen.getByPlaceholderText('Quantity');
        fireEvent.change(quantityInput, { target: { value: '3' } });
        expect(quantityInput.value).toBe('3');

        const descriptionInput = screen.getByPlaceholderText('Product Description');
        fireEvent.change(descriptionInput, { target: { value: 'This is a test product' } });
        expect(descriptionInput.value).toBe('This is a test product');
    });

    test('calls onSave and resetForm on form submission', () => {
        render(<ProductForm onSave={mockOnSave} resetForm={mockResetForm} />);

        fireEvent.change(screen.getByPlaceholderText('Product Name'), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '10' } });
        fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText('Product Description'), { target: { value: 'Sample description' } });

        fireEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(mockOnSave).toHaveBeenCalledWith({
            name: 'Test Product',
            price: '10',
            quantity: '5',
            description: 'Sample description',
        });

        expect(mockResetForm).toHaveBeenCalled();
    });

    test('populates fields when editing a product', () => {
        const editingProduct = {
            name: 'Edited Product',
            price: '15',
            quantity: '2',
            description: 'Updated description',
        };

        render(<ProductForm onSave={mockOnSave} editingProduct={editingProduct} resetForm={mockResetForm} />);

        expect(screen.getByPlaceholderText('Product Name').value).toBe('Edited Product');
        expect(screen.getByPlaceholderText('Price').value).toBe('15');
        expect(screen.getByPlaceholderText('Quantity').value).toBe('2');
        expect(screen.getByPlaceholderText('Product Description').value).toBe('Updated description');
    });
});
