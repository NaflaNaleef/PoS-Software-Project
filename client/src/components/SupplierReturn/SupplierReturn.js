import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SupplierReturn({ fetchProducts }) {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [returns, setReturns] = useState({
        supplierId: '',
        productName: '',
        quantity: '',
        reason: '',
    });

    useEffect(() => {
        // Fetch suppliers
        axios.get('/api/suppliers')
            .then((res) => setSuppliers(res.data.suppliers))
            .catch((err) => console.error('Error fetching suppliers:', err));

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
            await axios.post('/api/supplier-returns', returns);
            alert('Return submitted successfully');
            fetchProducts(); // Refresh product list after return
        } catch (err) {
            console.error('', err);
        }
    };

    return (
        <div>
            <h2>Supplier Return</h2>
            <form onSubmit={handleSubmitReturn}>
                <label>Supplier:</label>
                <select
                    name="supplierId"
                    value={returns.supplierId}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Supplier --</option>
                    {suppliers.map((s) => (
                        <option key={s._id} value={s._id}>
                            {s.name}
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

export default SupplierReturn;
