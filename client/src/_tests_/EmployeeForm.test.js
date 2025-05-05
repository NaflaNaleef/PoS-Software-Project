import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';
import '@testing-library/jest-dom/extend-expect';

describe('EmployeeForm', () => {
    let mockOnSave;
    let mockResetForm;

    beforeEach(() => {
        mockOnSave = jest.fn();
        mockResetForm = jest.fn();
    });

    test('renders the form with empty fields', () => {
        render(<EmployeeForm onSave={mockOnSave} editingEmployee={null} resetForm={mockResetForm} />);

        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Salary')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contact Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Select Position')).toBeInTheDocument();
    });

    test('renders the form with existing employee data when editingEmployee is passed', () => {
        const employee = {
            name: 'John Doe',
            position: 'Manager',
            salary: '50000',
            contactNumber: '1234567890',
            email: 'john.doe@example.com',
        };

        render(<EmployeeForm onSave={mockOnSave} editingEmployee={employee} resetForm={mockResetForm} />);

        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByDisplayValue('50000')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Manager')).toBeInTheDocument();
    });

    test('calls onSave with the correct data when form is submitted', () => {
        render(<EmployeeForm onSave={mockOnSave} editingEmployee={null} resetForm={mockResetForm} />);

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Jane Smith' } });
        fireEvent.change(screen.getByPlaceholderText('Salary'), { target: { value: '60000' } });
        fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '0987654321' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane.smith@example.com' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Manager' } });

        fireEvent.click(screen.getByText('Save'));

        expect(mockOnSave).toHaveBeenCalledWith({
            name: 'Jane Smith',
            position: 'Manager',
            salary: '60000',
            contactNumber: '0987654321',
            email: 'jane.smith@example.com',
        });
        expect(mockResetForm).toHaveBeenCalled();
    });

    test('resets form when resetForm is called', () => {
        render(<EmployeeForm onSave={mockOnSave} editingEmployee={null} resetForm={mockResetForm} />);

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Mark' } });
        fireEvent.change(screen.getByPlaceholderText('Salary'), { target: { value: '70000' } });

        // Call resetForm to simulate clearing
        fireEvent.click(screen.getByText('Save'));

        expect(mockResetForm).toHaveBeenCalled();
        expect(screen.getByPlaceholderText('Name').value).toBe('');
        expect(screen.getByPlaceholderText('Salary').value).toBe('');
    });
});
