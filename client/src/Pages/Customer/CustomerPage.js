import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import './customerPage.module.css';
import { Typography } from '@mui/material';
import { io } from 'socket.io-client';

function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    // const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [loading, setLoading] = useState(false);

    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

    // Fetch customers on mount
    useEffect(() => {
        fetchCustomers();

      
        // Socket.io listeners
        socket.on('customer-added', fetchCustomers);
        socket.on('customer-updated', fetchCustomers);
        socket.on('customer-deleted', fetchCustomers);
        
        return () => {
            socket.off('customer-added');
            socket.off('customer-updated');
            socket.off('customer-deleted');
            socket.disconnect();
        };

    }, [filter, sortBy, order, page, limit]); // Re-fetch when dependencies change

    const fetchCustomers = async () => {
        try {
            setLoading(true);
 
            const response = await axios.get('/api/customers', {
                params: { page, limit, sortBy, order, filter },
            });
            setCustomers(response.data.customers);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);   
        }
    };

    const handleNameSort = () => {
        if (sortBy === 'name') {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy('name');
            setOrder('asc');
        }
    };

    const getSortSymbol = () => {
        if (sortBy !== 'name') return '↕';
        return order === 'asc' ? '↑' : '↓';
    };

    const handleAddCustomer = async (customer) => {
        try {
            await axios.post('/api/customers', customer);
            fetchCustomers();
            resetForm();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleUpdateCustomer = async (id, updatedData) => {
        try {
            await axios.put(`/api/customers/${id}`, updatedData);
            fetchCustomers();
            resetForm();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const resetForm = () => {
        setEditingCustomer(null);
    };

    if (loading) return <div className="loading">Loading customers...</div>;

    return (
        <div className="customer-page">
            <Typography variant="h4" gutterBottom component="div" sx={{ mt: 3, mb: 3 }}> Customers</Typography>

            <div className="page-content">
                <div className="content-container">
                    {/* Filter Input */}
                    <input
                        type="text"
                        placeholder="Filter by name or contact number..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-input"

                    />
                    
                    <table>
                        <thead>
                            <tr>
                                <th 
                                    onClick={handleNameSort}
                                    className="sortable-header"
                                >
                                    <div className="header-content">
                                        Name
                                        <span className="sort-icon">{getSortSymbol()}</span>
                                    </div>
                                </th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr key={customer._id} className="table-row">
                                        <td className="table-cell">{customer.name}</td>
                                        <td className="table-cell">{customer.contactNumber}</td>
                                        <td className="table-cell">{customer.email}</td>
                                        <td className="table-cell">{customer.address}</td>
                                        <td className="table-cell actions">
                                            <button 
                                                className="action-btn edit-btn"
                                                onClick={() => setEditingCustomer(customer)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="action-btn delete-btn"
                                                onClick={() => handleDeleteCustomer(customer._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data">No customers found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="page-info">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="pagination-btn"
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="customer-form-container">
                    <CustomerForm
                        onSave={
                            editingCustomer
                                ? (data) => handleUpdateCustomer(editingCustomer._id, data)
                                : handleAddCustomer
                        }
                        editingCustomer={editingCustomer}
                        resetForm={resetForm}
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomerPage;