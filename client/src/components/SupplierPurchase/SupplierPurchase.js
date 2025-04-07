import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SupplierPurchase({ fetchProducts }) {
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]); 

    const [purchase, setPurchase] = useState({
        supplierId: '',
        productName: '', 
        quantity: '',
        unitPrice: '',
    });

    useEffect(() => {
        // Fetch suppliers
        axios.get('/api/suppliers')
            .then((res) => setSuppliers(res.data.suppliers))
            .catch((err) => console.error('Error fetching suppliers:', err));

        
        axios.get('/api/products')
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPurchase((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitPurchase = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/supplier-purchases', {
                supplierId: purchase.supplierId,
                productName: purchase.productName,
                quantity: purchase.quantity,
                unitPrice: purchase.unitPrice,
            });

            alert('Purchase submitted successfully');
            fetchProducts();
            setPurchase({
                supplierId: '',
                productName: '',
                quantity: '',
                unitPrice: '',
            });
        } catch (err) {
            console.error('', err);
            
        }
    };

    return (
        <div>
            <h2>Record Supplier Purchase</h2>
            <form onSubmit={handleSubmitPurchase}>
                <label>Supplier:</label>
                <select
                    name="supplierId"
                    value={purchase.supplierId}
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
                    value={purchase.productName}
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
                    value={purchase.quantity}
                    onChange={handleChange}
                    required
                />

                <label>Unit Price:</label>
                <input
                    type="number"
                    name="unitPrice"
                    value={purchase.unitPrice}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit Purchase</button>
            </form>
        </div>
    );
}

export default SupplierPurchase;
