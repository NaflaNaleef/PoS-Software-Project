
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../../components/ProductForm/ProductForm';
import './productPage.module.css';
import { Typography } from '@mui/material';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/products', {
                    params: { page, limit, sortBy, order, filter },
                });
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [filter, sortBy, order, page, limit]);

    const handleAddProduct = async (product) => {
        try {
            const response = await axios.post('/api/products', product);
            // Optimistically update the UI with the new product
            setProducts(prevProducts => [response.data, ...prevProducts]);
            resetForm();
        } catch (error) {
            console.error('Error adding product:', error);
            // Re-fetch to ensure consistency if optimistic update failed
            fetchProducts();
        }
    };

    const handleUpdateProduct = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/products/${id}`, updatedData);
            // Optimistically update the UI with the updated product
            setProducts(prevProducts => 
                prevProducts.map(product => 
                    product._id === id ? response.data : product
                )
            );
            resetForm();
        } catch (error) {
            console.error('Error updating product:', error);
            fetchProducts();
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            // Optimistically update the UI by removing the deleted product
            setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            fetchProducts();
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
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

    // Re-declare fetchProducts for use in the error handlers
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/products', {
                params: { page, limit, sortBy, order, filter },
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="product-page">
            <Typography variant="h4" gutterBottom component="div" sx={{ mt: 3, mb: 3 }}>
                Products
            </Typography>

            {isLoading && <div className="loading-indicator">Loading...</div>}

            <div className="page-content">
                <div className="content-container">
                    <input
                        type="text"
                        placeholder="Filter by name or description..."
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
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id} className="table-row">
                                        <td className="table-cell">{product.name}</td>
                                        <td className="table-cell">{product.price}</td>
                                        <td className="table-cell">{product.quantity}</td>
                                        <td className="table-cell">{product.description}</td>
                                        <td className="table-cell actions">
                                            <button 
                                                className="action-btn edit-btn"
                                                onClick={() => setEditingProduct(product)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="action-btn delete-btn"
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data">
                                        {isLoading ? 'Loading...' : 'No products found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1 || isLoading}
                        >
                            Previous
                        </button>
                        <span className="page-info">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="pagination-btn"
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages || isLoading}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="product-form-container">
                    <ProductForm
                        onSave={
                            editingProduct
                                ? (data) => handleUpdateProduct(editingProduct._id, data)
                                : handleAddProduct
                        }
                        editingProduct={editingProduct}
                        resetForm={resetForm}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;