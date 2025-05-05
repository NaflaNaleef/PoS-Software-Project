import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierForm from '../../components/SupplierForm/SupplierForm';
<<<<<<< HEAD
import SupplierPurchase from '../../components/SupplierPurchase/SupplierPurchase';
import SupplierReturn from '../../components/SupplierReturn/SupplierReturn';
import './supplierPage.css';
=======
import './supplierPage.css';
import { Typography } from '@mui/material';
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14

function SupplierPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [filter, setFilter] = useState('');
<<<<<<< HEAD
    const [activeTab, setActiveTab] = useState('suppliers');

=======
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14

    // Fetch suppliers on mount
    useEffect(() => {
        fetchSuppliers();
    }, [filter, sortBy, order, page, limit]); // Re-fetch when dependencies change

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/suppliers', {
                params: { page, limit, sortBy, order, filter },
            });
            setSuppliers(response.data.suppliers);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleAddSupplier = async (supplier) => {
        try {
            await axios.post('/api/suppliers', supplier);
            fetchSuppliers();
            resetForm();
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    };

    const handleUpdateSupplier = async (id, updatedData) => {
        try {
            await axios.put(`/api/suppliers/${id}`, updatedData);
            fetchSuppliers();
            resetForm();
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    const handleDeleteSupplier = async (id) => {
        try {
            await axios.delete(`/api/suppliers/${id}`);
            fetchSuppliers();
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    const resetForm = () => {
        setEditingSupplier(null);
    };

    return (
        <div className="supplier-page">
<<<<<<< HEAD
    <h1>Suppliers</h1>

    {/* Tabs */}
    <div className="tab-buttons">
        <button onClick={() => setActiveTab('suppliers')}>Suppliers</button>
        <button onClick={() => setActiveTab('purchase')}>Purchases</button>
        <button onClick={() => setActiveTab('return')}>Returns</button>
    </div>

    {/* Tab Content */}
    <div className="tab-content">
        {activeTab === 'suppliers' && (
            <>
                {<div className="page-content">
=======
         <Typography variant="h4" gutterBottom component="div" sx={{ mt: 3, mb: 3 }}>
         Suppliers</Typography>
   
            

            <div className="page-content">
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
                <div className="content-container">
                    {/* Filter Input */}
                    <input
                        type="text"
                        placeholder="Filter by name or contact number..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />

                    {/* Sort By Selector */}
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="contactNumber">Contact Number</option>
                        <option value="email">Email</option>
                    </select>

                    {/* Sort Order Selector */}
                    <select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    {/* Supplier Table */}
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
<<<<<<< HEAD
                                <th>Company Name</th>
=======
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.length > 0 ? (
                                suppliers.map((supplier) => (
                                    <tr key={supplier._id}>
                                        <td>{supplier.name}</td>
<<<<<<< HEAD
                                        <td>{supplier.company}</td>
=======
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
                                        <td>{supplier.contactNumber}</td>
                                        <td>{supplier.email}</td>
                                        <td>{supplier.address}</td>
                                        <td className="actions">
                                            <button onClick={() => setEditingSupplier(supplier)}>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSupplier(supplier._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No suppliers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div>
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Supplier Form */}
                <div className="supplier-form-container">
                    <SupplierForm
                        onSave={
                            editingSupplier
                                ? (data) => handleUpdateSupplier(editingSupplier._id, data)
                                : handleAddSupplier
                        }
                        editingSupplier={editingSupplier}
                        resetForm={resetForm}
                    />
                </div>
            </div>
<<<<<<< HEAD
}
            </>
        )}

        {activeTab === 'purchase' && <SupplierPurchase />}
        {activeTab === 'return' && <SupplierReturn />}
    </div>
</div>

=======
        </div>
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
    );
}

export default SupplierPage;
