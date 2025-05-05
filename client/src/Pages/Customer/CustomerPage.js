// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import CustomerForm from '../../components/CustomerForm/CustomerForm';
// // // // import './customerPage.module.css';

// // // // function CustomerPage() {
// // // //     const [customers, setCustomers] = useState([]);
// // // //     const [editingCustomer, setEditingCustomer] = useState(null);
// // // //     const [page, setPage] = useState(1);
// // // //     const [limit, setLimit] = useState(10);
// // // //     const [totalPages, setTotalPages] = useState(0);
// // // //     const [sortBy, setSortBy] = useState('name');
// // // //     const [order, setOrder] = useState('asc');
// // // //     const [filter, setFilter] = useState('');
// // // //     if (!customers) {
// // // //         return <div>Loading customers or handling error...</div>;
// // // //       }
// // // //     // Fetch customers on mount
// // // //     useEffect(() => {
// // // //         fetchCustomers();
// // // //     }, [filter, sortBy, order, page, limit]); // Re-fetch when dependencies change

// // // //     const fetchCustomers = async () => {
// // // //         try {
// // // //             const response = await axios.get('/api/customers', {
// // // //                 params: { page, limit, sortBy, order, filter },
// // // //             });
// // // //             setCustomers(response.data.customers);
// // // //             setTotalPages(response.data.totalPages);
// // // //         } catch (error) {
// // // //             console.error('Error fetching customers:', error);
// // // //         }
// // // //     };

// // // //     const handleAddCustomer = async (customer) => {
// // // //         try {
// // // //             await axios.post('/api/customers', customer);
// // // //             fetchCustomers();
// // // //             resetForm();
// // // //         } catch (error) {
// // // //             console.error('Error adding customer:', error);
// // // //         }
// // // //     };

// // // //     const handleUpdateCustomer = async (id, updatedData) => {
// // // //         try {
// // // //             await axios.put(`/api/customers/${id}`, updatedData);
// // // //             fetchCustomers();
// // // //             resetForm();
// // // //         } catch (error) {
// // // //             console.error('Error updating customer:', error);
// // // //         }
// // // //     };

// // // //     const handleDeleteCustomer = async (id) => {
// // // //         try {
// // // //             await axios.delete(`/api/customers/${id}`);
// // // //             fetchCustomers();
// // // //         } catch (error) {
// // // //             console.error('Error deleting customer:', error);
// // // //         }
// // // //     };

// // // //     const resetForm = () => {
// // // //         setEditingCustomer(null);
// // // //     };

// // // //     return (
// // // //         <div className="customer-page">
// // // //             <h1>Customers</h1>

// // // //             <div className="page-content">
// // // //                 <div className="content-container">
// // // //                     {/* Filter Input */}
// // // //                     <input
// // // //                         type="text"
// // // //                         placeholder="Filter by name or contact number..."
// // // //                         value={filter}
// // // //                         onChange={(e) => setFilter(e.target.value)}
// // // //                     />

// // // //                     {/* Sort By Selector */}
// // // //                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
// // // //                         <option value="name">Name</option>
// // // //                         <option value="contactNumber">Contact Number</option>
// // // //                         <option value="email">Email</option>
// // // //                     </select>

// // // //                     {/* Sort Order Selector */}
// // // //                     <select value={order} onChange={(e) => setOrder(e.target.value)}>
// // // //                         <option value="asc">Ascending</option>
// // // //                         <option value="desc">Descending</option>
// // // //                     </select>

// // // //                     {/* Customer Table */}
// // // //                     <table>
// // // //                         <thead>
// // // //                             <tr>
// // // //                                 <th>Name</th>
// // // //                                 <th>Contact Number</th>
// // // //                                 <th>Email</th>
// // // //                                 <th>Address</th>
// // // //                                 <th>Actions</th>
// // // //                             </tr>
// // // //                         </thead>
// // // //                         <tbody>
// // // //                             {customers.length > 0 ? (
// // // //                                 customers.map((customer) => (
// // // //                                     <tr key={customer._id}>
// // // //                                         <td>{customer.name}</td>
// // // //                                         <td>{customer.contactNumber}</td>
// // // //                                         <td>{customer.email}</td>
// // // //                                         <td>{customer.address}</td>
// // // //                                         <td className="actions">
// // // //                                             <button onClick={() => setEditingCustomer(customer)}>
// // // //                                                 Edit
// // // //                                             </button>
// // // //                                             <button
// // // //                                                 onClick={() => handleDeleteCustomer(customer._id)}
// // // //                                             >
// // // //                                                 Delete
// // // //                                             </button>
// // // //                                         </td>
// // // //                                     </tr>
// // // //                                 ))
// // // //                             ) : (
// // // //                                 <tr>
// // // //                                     <td colSpan="4">No customers found.</td>
// // // //                                 </tr>
// // // //                             )}
// // // //                         </tbody>
// // // //                     </table>

// // // //                     {/* Pagination Controls */}
// // // //                     <div>
// // // //                         <button
// // // //                             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
// // // //                             disabled={page === 1}
// // // //                         >
// // // //                             Previous
// // // //                         </button>
// // // //                         <span>
// // // //                             Page {page} of {totalPages}
// // // //                         </span>
// // // //                         <button
// // // //                             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
// // // //                             disabled={page === totalPages}
// // // //                         >
// // // //                             Next
// // // //                         </button>
// // // //                     </div>
// // // //                 </div>

// // // //                 {/* Customer Form */}
// // // //                 <div className="customer-form-container">
// // // //                     <CustomerForm
// // // //                         onSave={
// // // //                             editingCustomer
// // // //                                 ? (data) => handleUpdateCustomer(editingCustomer._id, data)
// // // //                                 : handleAddCustomer
// // // //                         }
// // // //                         editingCustomer={editingCustomer}
// // // //                         resetForm={resetForm}
// // // //                     />
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default CustomerPage;
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import CustomerForm from '../../components/CustomerForm/CustomerForm';
// // // import './customerPage.module.css';
// // // import { io } from 'socket.io-client';

// // // function CustomerPage() {
// // //     const [customers, setCustomers] = useState([]);
// // //     const [editingCustomer, setEditingCustomer] = useState(null);
// // //     const [page, setPage] = useState(1);
// // //     const [limit, setLimit] = useState(10);
// // //     const [totalPages, setTotalPages] = useState(0);
// // //     const [sortBy, setSortBy] = useState('name');
// // //     const [order, setOrder] = useState('asc');
// // //     const [filter, setFilter] = useState('');

// // //     // Socket.IO connection
// // //     const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

// // //     const fetchCustomers = async () => {
// // //         try {
// // //             const response = await axios.get('/api/customers', {
// // //                 params: { page, limit, sortBy, order, filter },
// // //             });
// // //             setCustomers(response.data.customers);
// // //             setTotalPages(response.data.totalPages);
// // //         } catch (error) {
// // //             console.error('Error fetching customers:', error);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchCustomers();
        
// // //         return () => {
// // //             socket.disconnect(); // Clean up on unmount
// // //         };
// // //     }, [filter, sortBy, order, page, limit]);

// // //     const handleAddCustomer = async (customer) => {
// // //         try {
// // //             await axios.post('/api/customers', customer);
            
// // //             // Emit real-time update after successful addition
// // //             const totalCustomers = await axios.get('/api/customers/count');
// // //             socket.emit('customer-update', { 
// // //                 totalCustomers: totalCustomers.data.count 
// // //             });
            
// // //             fetchCustomers(); // Refresh local list
// // //             resetForm();
// // //         } catch (error) {
// // //             console.error('Error adding customer:', error);
// // //         }
// // //     };

// // //     const handleUpdateCustomer = async (id, updatedData) => {
// // //         try {
// // //             await axios.put(`/api/customers/${id}`, updatedData);
// // //             fetchCustomers();
// // //             resetForm();
// // //         } catch (error) {
// // //             console.error('Error updating customer:', error);
// // //         }
// // //     };

// // //     const handleDeleteCustomer = async (id) => {
// // //         try {
// // //             await axios.delete(`/api/customers/${id}`);
            
// // //             // Emit real-time update after deletion
// // //             const totalCustomers = await axios.get('/api/customers/count');
// // //             socket.emit('customer-update', { 
// // //                 totalCustomers: totalCustomers.data.count 
// // //             });
            
// // //             fetchCustomers();
// // //         } catch (error) {
// // //             console.error('Error deleting customer:', error);
// // //         }
// // //     };

// // //     const resetForm = () => {
// // //         setEditingCustomer(null);
// // //     };

// // //     return (
// // //         <div className="customer-page">
// // //             {/* Keep all your existing JSX exactly as is */}
// // //             <h1>Customers</h1>
// // //             <div className="page-content">
// // //                 {/* Your entire current layout remains unchanged */}
// // //                 {/* Filter inputs, table, pagination, form - all stays the same */}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default CustomerPage;






// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import CustomerForm from '../../components/CustomerForm/CustomerForm';
// // import './customerPage.module.css';

// // function CustomerPage() {
// //     // Your original state (UNCHANGED)
// //     const [customers, setCustomers] = useState([]);
// //     const [editingCustomer, setEditingCustomer] = useState(null);
// //     const [page, setPage] = useState(1);
// //     const [limit, setLimit] = useState(10);
// //     const [totalPages, setTotalPages] = useState(0);
// //     const [sortBy, setSortBy] = useState('name');
// //     const [order, setOrder] = useState('asc');
// //     const [filter, setFilter] = useState('');

// //     // Your original fetch function (UNCHANGED)
// //     const fetchCustomers = async () => {
// //         try {
// //             const response = await axios.get('/api/customers', {
// //                 params: { page, limit, sortBy, order, filter },
// //             });
// //             setCustomers(response.data.customers);
// //             setTotalPages(response.data.totalPages);
// //         } catch (error) {
// //             console.error('Error fetching customers:', error);
// //         }
// //     };

// //     // Your original useEffect (UNCHANGED)
// //     useEffect(() => {
// //         fetchCustomers();
// //     }, [filter, sortBy, order, page, limit]);

// //     // Your original handlers (only added fetchCustomers() calls)
// //     const handleAddCustomer = async (customer) => {
// //         try {
// //             await axios.post('/api/customers', customer);
// //             fetchCustomers(); // Your original refresh logic
// //             resetForm();
// //         } catch (error) {
// //             console.error('Error adding customer:', error);
// //         }
// //     };

// //     const handleUpdateCustomer = async (id, updatedData) => {
// //         try {
// //             await axios.put(`/api/customers/${id}`, updatedData);
// //             fetchCustomers(); // Your original refresh logic
// //             resetForm();
// //         } catch (error) {
// //             console.error('Error updating customer:', error);
// //         }
// //     };

// //     const handleDeleteCustomer = async (id) => {
// //         try {
// //             await axios.delete(`/api/customers/${id}`);
// //             fetchCustomers(); // Your original refresh logic
// //         } catch (error) {
// //             console.error('Error deleting customer:', error);
// //         }
// //     };

// //     const resetForm = () => {
// //         setEditingCustomer(null);
// //     };

// //     // Your original render (UNCHANGED)
// //     return (
// //         <div className="customer-page">
// //             <h1>Customers</h1>
// //             <div className="page-content">
// //                 {/* Your existing filter inputs, table, and form */}
// //             </div>
// //         </div>
// //     );
// // }

// // export default CustomerPage;































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CustomerForm from '../../components/CustomerForm/CustomerForm';
// import './customerPage.module.css';

// function CustomerPage() {
//     const [customers, setCustomers] = useState([]);
//     const [editingCustomer, setEditingCustomer] = useState(null);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [sortBy, setSortBy] = useState('name');
//     const [order, setOrder] = useState('asc');
//     const [filter, setFilter] = useState('');

//     // Fetch customers on mount
//     useEffect(() => {
//         fetchCustomers();
//     }, [filter, sortBy, order, page, limit]); // Re-fetch when dependencies change

//     const fetchCustomers = async () => {
//         try {
//             const response = await axios.get('/api/customers', {
//                 params: { page, limit, sortBy, order, filter },
//             });
//             setCustomers(response.data.customers);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//         }
//     };

//     const handleAddCustomer = async (customer) => {
//         try {
//             await axios.post('/api/customers', customer);
//             fetchCustomers();
//             resetForm();
//         } catch (error) {
//             console.error('Error adding customer:', error);
//         }
//     };

//     const handleUpdateCustomer = async (id, updatedData) => {
//         try {
//             await axios.put(`/api/customers/${id}`, updatedData);
//             fetchCustomers();
//             resetForm();
//         } catch (error) {
//             console.error('Error updating customer:', error);
//         }
//     };

//     const handleDeleteCustomer = async (id) => {
//         try {
//             await axios.delete(`/api/customers/${id}`);
//             fetchCustomers();
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     };

//     const resetForm = () => {
//         setEditingCustomer(null);
//     };

//     return (
//         <div className="customer-page">
//             <h1>Customers</h1>

//             <div className="page-content">
//                 <div className="content-container">
//                     {/* Filter Input */}
//                     <input
//                         type="text"
//                         placeholder="Filter by name or contact number..."
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                     />

//                     {/* Sort By Selector */}
//                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="name">Name</option>
//                         <option value="contactNumber">Contact Number</option>
//                         <option value="email">Email</option>
//                     </select>

//                     {/* Sort Order Selector */}
//                     <select value={order} onChange={(e) => setOrder(e.target.value)}>
//                         <option value="asc">Ascending</option>
//                         <option value="desc">Descending</option>
//                     </select>

//                     {/* Customer Table */}
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Contact Number</th>
//                                 <th>Email</th>
//                                 <th>Address</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {customers.length > 0 ? (
//                                 customers.map((customer) => (
//                                     <tr key={customer._id}>
//                                         <td>{customer.name}</td>
//                                         <td>{customer.contactNumber}</td>
//                                         <td>{customer.email}</td>
//                                         <td>{customer.address}</td>
//                                         <td className="actions">
//                                             <button onClick={() => setEditingCustomer(customer)}>
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDeleteCustomer(customer._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="4">No customers found.</td>
//                                 </tr>
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

//                 {/* Customer Form */}
//                 <div className="customer-form-container">
//                     <CustomerForm
//                         onSave={
//                             editingCustomer
//                                 ? (data) => handleUpdateCustomer(editingCustomer._id, data)
//                                 : handleAddCustomer
//                         }
//                         editingCustomer={editingCustomer}
//                         resetForm={resetForm}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CustomerForm from '../../components/CustomerForm/CustomerForm';
// import './customerPage.module.css';
// import { io } from 'socket.io-client'; 

// function CustomerPage() {
//     const [customers, setCustomers] = useState([]);
//     const [editingCustomer, setEditingCustomer] = useState(null);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [sortBy, setSortBy] = useState('name');
//     const [order, setOrder] = useState('asc');
//     const [filter, setFilter] = useState('');
    
//     // Initialize socket (ONLY ADDITION TO STATE)
//     const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

//     // Fetch customers on mount (ORIGINAL UNCHANGED)
//     useEffect(() => {
//         fetchCustomers();
//         return () => socket.disconnect(); // <-- ONLY ADDITION: Cleanup
//     }, [filter, sortBy, order, page, limit]);

//     const fetchCustomers = async () => {
//         try {
//             const response = await axios.get('/api/customers', {
//                 params: { page, limit, sortBy, order, filter },
//             });
//             setCustomers(response.data.customers);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//         }
//     };

//     // Original handlers with minimal additions
//     const handleAddCustomer = async (customer) => {
//         try {
//             await axios.post('/api/customers', customer);
//             fetchCustomers();
//             resetForm();
//             socket.emit('customer-update'); // <-- ONLY ADDITION
//         } catch (error) {
//             console.error('Error adding customer:', error);
//         }
//     };

//     const handleUpdateCustomer = async (id, updatedData) => {
//         try {
//             await axios.put(`/api/customers/${id}`, updatedData);
//             fetchCustomers();
//             resetForm();
//         } catch (error) {
//             console.error('Error updating customer:', error);
//         }
//     };

//     const handleDeleteCustomer = async (id) => {
//         try {
//             await axios.delete(`/api/customers/${id}`);
//             fetchCustomers();
//             socket.emit('customer-update'); // <-- ONLY ADDITION
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     };

//     const resetForm = () => {
//         setEditingCustomer(null);
//     };

//     /* 
//     =============================================== 
//     BELOW THIS POINT: 100% ORIGINAL RENDER CODE 
//     =============================================== 
//     */
//     return (
//         <div className="customer-page">
//             <h1>Customers</h1>
//             <div className="page-content">
//                 <div className="content-container">
//                     {/* Filter Input */}
//                     <input
//                         type="text"
//                         placeholder="Filter by name or contact number..."
//                         value={filter}
//                         onChange={(e) => setFilter(e.target.value)}
//                     />

//                     {/* Sort Controls */}
//                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="name">Name</option>
//                         <option value="contactNumber">Contact Number</option>
//                         <option value="email">Email</option>
//                     </select>

//                     <select value={order} onChange={(e) => setOrder(e.target.value)}>
//                         <option value="asc">Ascending</option>
//                         <option value="desc">Descending</option>
//                     </select>

//                     {/* Table */}
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Contact Number</th>
//                                 <th>Email</th>
//                                 <th>Address</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {customers.length > 0 ? (
//                                 customers.map((customer) => (
//                                     <tr key={customer._id}>
//                                         <td>{customer.name}</td>
//                                         <td>{customer.contactNumber}</td>
//                                         <td>{customer.email}</td>
//                                         <td>{customer.address}</td>
//                                         <td className="actions">
//                                             <button onClick={() => setEditingCustomer(customer)}>
//                                                 Edit
//                                             </button>
//                                             <button onClick={() => handleDeleteCustomer(customer._id)}>
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5">No customers found.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>

//                     {/* Pagination */}
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

//                 {/* Form */}
//                 <div className="customer-form-container">
//                     <CustomerForm
//                         onSave={
//                             editingCustomer
//                                 ? (data) => handleUpdateCustomer(editingCustomer._id, data)
//                                 : handleAddCustomer
//                         }
//                         editingCustomer={editingCustomer}
//                         resetForm={resetForm}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CustomerPage;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import './customerPage.module.css';
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
    const [loading, setLoading] = useState(false);
    
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

    // Fetch customers and setup socket listener
    useEffect(() => {
        fetchCustomers();
        
        // Listen for refresh events from server
        socket.on('refresh-customers', fetchCustomers);
        
        return () => {
            socket.off('refresh-customers');
            socket.disconnect();
        };
    }, [filter, sortBy, order, page, limit]);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/customers', {
                params: { page, limit, sortBy, order, filter },
            });
            setCustomers(response.data.customers || []);
            setTotalPages(response.data.totalPages || 0);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomer = async (customer) => {
        try {
            await axios.post('/api/customers', customer);
            resetForm();
            // Let the backend handle the refresh broadcast
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleUpdateCustomer = async (id, updatedData) => {
        try {
            await axios.put(`/api/customers/${id}`, updatedData);
            resetForm();
            // Let the backend handle the refresh broadcast
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`);
            // Let the backend handle the refresh broadcast
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
            <h1>Customers</h1>
            <div className="page-content">
                <div className="content-container">
                    <input
                        type="text"
                        placeholder="Filter by name or contact number..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />

                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="contactNumber">Contact Number</option>
                        <option value="email">Email</option>
                    </select>

                    <select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr key={customer._id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.contactNumber}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td className="actions">
                                            <button onClick={() => setEditingCustomer(customer)}>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteCustomer(customer._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No customers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="pagination">
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