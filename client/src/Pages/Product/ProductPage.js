// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductForm from '../../components/ProductForm/ProductForm';
// import './productPage.module.css';
// import BarcodeScanner from '../../components/BarcodeScanner/BarcodeScanner';
// import { Typography } from '@mui/material';


// function ProductPage() {
//     const [products, setProducts] = useState([]);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [sortBy, setSortBy] = useState('name');
//     const [order, setOrder] = useState('asc');
//     const [filter, setFilter] = useState('');
//     const [scannedBarcode, setScannedBarcode] = useState('');

//     useEffect(() => {
//         const fetchProducts = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axios.get('/api/products', {
//                     params: { page, limit, sortBy, order, filter },
//                 });
//                 setProducts(response.data.products);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProducts();

//     }, [filter, sortBy, order, page, limit]); // Re-fetch when dependencies change

//     const fetchProducts = async () => {
//         try {
//             const response = await axios.get('/api/products', {
//                 params: { page, limit, sortBy, order, filter },
//             });
//             console.log(response.data); // Debug log the response
//             setProducts(response.data.products); // Assuming response contains a 'products' array
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
    

//     const handleAddProduct = async (product) => {
//         try {
//             const response = await axios.post('/api/products', product);

//             // await axios.post('/api/products', product);
//             setProducts(prevProducts => [response.data, ...prevProducts]);

//             // fetchProducts();
//             resetForm();
//         } catch (error) {
//             console.error('Error adding product:', error);

//             fetchProducts();

//         }
//     };
//     const handleUpdateProduct = async (id, updatedData) => {
//         try {
//             const response = await axios.put(`/api/products/${id}`, updatedData);
//             // Optimistically update the UI with the updated product
//             setProducts(prevProducts => 
//                 prevProducts.map(product => 
//                     product._id === id ? response.data : product
//                 )
//             );
//             resetForm();
//         } catch (error) {
//             console.error('Error updating product:', error);
//             fetchProducts();
//         }
//     };
//     // const handleUpdateProduct = async (id, updatedData) => {
//     //     try {
//     //         await axios.put(`/api/products/${id}`, updatedData);
//     //         fetchProducts();
//     //         resetForm();
//     //     } catch (error) {
//     //         console.error('Error updating product:', error);
//     //     }
//     // };

//     // const handleDeleteProduct = async (id) => {
//     //     try {
//     //         await axios.delete(`/api/products/${id}`);
//     //         fetchProducts();
//     //     } catch (error) {
//     //         console.error('Error deleting product:', error);
//     //     }
//     // };
//     const handleDeleteProduct = async (id) => {
//         try {
//             await axios.delete(`/api/products/${id}`);
//             // Optimistically update the UI by removing the deleted product
//             setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             fetchProducts();
//         }
//     };
//     const handleNameSort = () => {
//         if (sortBy === 'name') {
//             setOrder(order === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortBy('name');
//             setOrder('asc');
//         }
//     };

//     const getSortSymbol = () => {
//         if (sortBy !== 'name') return '↕';
//         return order === 'asc' ? '↑' : '↓';
//     };


//     const resetForm = () => {
//         setEditingProduct(null);
//     };
//       // Re-declare fetchProducts for use in the error handlers
//       const fetchProducts = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get('/api/products', {
//                 params: { page, limit, sortBy, order, filter },
//             });
//             setProducts(response.data.products);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Typography variant="h4" gutterBottom component="div" sx={{ mt: 3, mb: 3 }}>
//                 Products
//             </Typography>
//             {isLoading && <div className="loading-indicator">Loading...</div>}

//         <div className="product-page">
//             <h1>Products</h1>

//             <div className="page-content">
//                 <div className="content-container">
//                     {/* Filter Input */}
//                     <input
//                         type="text"
//                         placeholder="Filter by name or description..."
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                         className="filter-input"

//                     />

//                     {/* Sort By Selector */}
//                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="name">Name</option>
//                         <option value="price">Price</option>
//                         <option value="quantity">Quantity</option>
//                     </select>

//                     {/* Sort Order Selector
//                     <select value={order} onChange={(e) => setOrder(e.target.value)}>
//                         <option value="asc">Ascending</option>
//                         <option value="desc">Descending</option>
//                     </select> */}

//                     {/* Product Table */}
//                     <table>
//                         <thead>
//                             <tr>
//                             <th 
//                                     onClick={handleNameSort}
//                                     className="sortable-header"
//                                 >
//                                     <div className="header-content">
//                                         Name
//                                         <span className="sort-icon">{getSortSymbol()}</span>
//                                     </div>
//                                 </th>

//                                 <th>Name</th>
//                                 <th>Barcode</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Description</th>
//                                 <th>Category</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.length > 0 ? (
//                                 products.map((product) => (
//                                     <tr key={product._id}>
//                                         <td>{product.name}</td>
//                                         <td>{product.barcode}</td>
//                                         <td>{product.price}</td>
//                                         <td>{product.quantity}</td>
//                                         <td>{product.description}</td>
//                                         <td>{product.category}</td>
//                                         <td className="actions">
//                                             <button onClick={() => setEditingProduct(product)}>
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDeleteProduct(product._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//  <td colSpan="5" className="no-data">
//                                         {isLoading ? 'Loading...' : 'No products found'}
//                                     </td>                                </tr>
//                             )}
//                         </tbody>
//                     </table>

//                     {/* Pagination Controls */}
//                     <div>
//                         <button
//                             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                             disabled={page === 1}
//                         >
//                             Previous
//                         </button>
//                         <span>
//                             Page {page} of {totalPages}
//                         </span>
//                         <button
//                             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                             disabled={page === totalPages}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>

//                 {/* Product Form */}
//                 <div className="product-form-container">
//                     <BarcodeScanner onScan={(code) => setScannedBarcode(code)} />
//                     <ProductForm
//                         onSave={
//                             editingProduct
//                                 ? (data) => handleUpdateProduct(editingProduct._id, data)
//                                 : handleAddProduct
//                             }
//                          editingProduct={editingProduct}
//                          resetForm={resetForm}
//                         scannedBarcode={scannedBarcode}
//                     />
//                  </div>

//             </div>
//         </div>
//     );
// }

// export default ProductPage;

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import ProductForm from '../../components/ProductForm/ProductForm';
import './productPage.module.css';
import BarcodeScanner from '../../components/BarcodeScanner/BarcodeScanner';
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
    const [scannedBarcode, setScannedBarcode] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Added missing state

    // Single unified fetchProducts function
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
            setProducts(prevProducts => [response.data, ...prevProducts]);
            resetForm();
        } catch (error) {
            console.error('Error adding product:', error);
            fetchProducts();
        }
    };

    const handleUpdateProduct = async (id, updatedData) => {
        try {
            const response = await axios.put(`/api/products/${id}`, updatedData);
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

                    {/* <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="quantity">Quantity</option>
                    </select> */}

                    <table>
                        <thead>
                            <tr>
                            <th onClick={handleNameSort} style={{ cursor: 'pointer' }}>
                            Name {sortBy === 'name' && getSortSymbol()}
                            </th>
                                <th>Barcode</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.barcode}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td className="actions">
                                            <button onClick={() => setEditingProduct(product)}>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="no-data">
                                        {isLoading ? 'Loading...' : 'No products found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

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

                <div className="product-form-container">
                    <BarcodeScanner onScan={(code) => setScannedBarcode(code)} />
                    <ProductForm
                        onSave={
                            editingProduct
                                ? (data) => handleUpdateProduct(editingProduct._id, data)
                                : handleAddProduct
                            }
                        editingProduct={editingProduct}
                        resetForm={resetForm}
                        scannedBarcode={scannedBarcode}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;