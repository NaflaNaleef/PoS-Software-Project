import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesReturn({ fetchProducts }) {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [returns, setReturns] = useState({
        customerId: '',
        productName: '',
        quantity: '',
        reason: '',
    });

    useEffect(() => {
        // Fetch customers
        axios.get('/api/customers')
            .then((res) => setCustomers(res.data.customers))
            .catch((err) => console.error('Error fetching customers:', err));

        // Fetch products
        axios.get('/api/products')
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReturns((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitReturn = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/sales-returns', returns);
            alert('Sales return submitted successfully');
            fetchProducts(); // Refresh product list after return
        } catch (err) {
            console.error('Error submitting sales return:', err);
        }
    };

    return (
        <div>
            {/* <h2>Sales Return</h2> */}
            <form onSubmit={handleSubmitReturn}>
                <label>Customer:</label>
                <select
                    name="customerId"
                    value={returns.customerId}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Customer --</option>
                    {customers.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <label>Product:</label>
                <select
                    name="productName"
                    value={returns.productName}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Product --</option>
                    {products.map((p) => (
                        <option key={p._id} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <label>Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    value={returns.quantity}
                    onChange={handleChange}
                    required
                />

                <label>Reason:</label>
                <input
                    type="text"
                    name="reason"
                    value={returns.reason}
                    onChange={handleChange}
                />

                <button type="submit">Submit Return</button>
            </form>
        </div>
    );
}

export default SalesReturn;
