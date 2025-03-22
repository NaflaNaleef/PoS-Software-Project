import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerForm from "../components/CustomerForm/CustomerForm";


describe('CustomerForm Component', () => {
    const mockOnSave = jest.fn();
    const mockResetForm = jest.fn();

    beforeEach(() => {
        mockOnSave.mockClear();
        mockResetForm.mockClear();
    });

    test('renders form with input fields and submit button', () => {
        render(<CustomerForm onSave={mockOnSave} resetForm={mockResetForm} />);

        expect(screen.getByPlaceholderText('Customer Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contact Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    test('allows user to type into input fields', () => {
        render(<CustomerForm onSave={mockOnSave} resetForm={mockResetForm} />);

        const nameInput = screen.getByPlaceholderText('Customer Name');
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        expect(nameInput.value).toBe('John Doe');

        const emailInput = screen.getByPlaceholderText('Email Address');
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        expect(emailInput.value).toBe('john@example.com');

        const contactInput = screen.getByPlaceholderText('Contact Number');
        fireEvent.change(contactInput, { target: { value: '1234567890' } });
        expect(contactInput.value).toBe('1234567890');

        const addressInput = screen.getByPlaceholderText('Address');
        fireEvent.change(addressInput, { target: { value: '123 Street, City' } });
        expect(addressInput.value).toBe('123 Street, City');
    });

    test('calls onSave and resetForm when form is submitted', () => {
        render(<CustomerForm onSave={mockOnSave} resetForm={mockResetForm} />);

        fireEvent.change(screen.getByPlaceholderText('Customer Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Street, City' } });

        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        expect(mockOnSave).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            contactNumber: '1234567890',
            address: '123 Street, City',
        });

        expect(mockResetForm).toHaveBeenCalled();
    });

    test('pre-fills form when editingCustomer is provided', () => {
        const editingCustomer = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            contactNumber: '9876543210',
            address: '456 Avenue, City',
        };

        render(<CustomerForm onSave={mockOnSave} editingCustomer={editingCustomer} resetForm={mockResetForm} />);

        expect(screen.getByPlaceholderText('Customer Name').value).toBe(editingCustomer.name);
        expect(screen.getByPlaceholderText('Email Address').value).toBe(editingCustomer.email);
        expect(screen.getByPlaceholderText('Contact Number').value).toBe(editingCustomer.contactNumber);
        expect(screen.getByPlaceholderText('Address').value).toBe(editingCustomer.address);
    });
});
