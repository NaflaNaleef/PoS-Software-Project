import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './billPage.module.css';

const BillPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('Not Paid');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [productSearchTerm, setProductSearchTerm] = useState(''); // Search term for products
  const [customerSearchTerm, setCustomerSearchTerm] = useState(''); // Search term for customers
  const [customers, setCustomers] = useState([]); // Store customers
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered customers list

  useEffect(() => {
    axios.get('/api/customers')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCustomers(res.data);
        } else {
          console.error('Unexpected response format:', res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

   useEffect(() => {
  axios.get('/api/products')
  .then((res) => {
    if (Array.isArray(res.data)) {
      setProducts(res.data);
    } else {
      console.error('Unexpected response format:', res.data);
    }
  })
  .catch((error) => {
    console.error('Error fetching customers:', error);
  });
}, []);

   // Filter customers based on the search term
   useEffect(() => {
    const filtered = (Array.isArray(customers) ? customers : []).filter((customer) =>
      customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.contactNumber.includes(customerSearchTerm)
    );
    setFilteredCustomers(filtered);
  }, [customerSearchTerm, customers]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const addToCart = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    const existingProduct = cart.find((item) => item._id === productId);

    if (existingProduct) {
      // Update quantity if product already exists in cart
      setCart(
        cart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = () => {
    axios
      .post('/api/sales', {
        customers,
        products: cart.map((item) => ({ productId: item._id, quantity: item.quantity })),
        paymentStatus,
        paymentMethod,
      })
      .then(() => alert('Sale created!'))
      .catch((error) => alert(error.message));
  };

  // Handle customer selection
  const handleCustomerSelect = (selectedCustomer) => {
    setCustomers(selectedCustomer.name); // Set the selected customer name
    setCustomerSearchTerm(''); // Clear search input after selection
    setFilteredCustomers([]); // Clear filtered list after selection
  };

  return (
    <div>
      <h2>Bill</h2>

      {/* Customer Search and Selection */}
      <input
        type="text"
        placeholder="Search Customer by Name or Phone"
        value={customerSearchTerm}
        onChange={(e) => setCustomerSearchTerm(e.target.value)}
      />

      <div>
        {/* Display filtered customers */}
        {filteredCustomers.length > 0 && (
          <ul>
            {filteredCustomers.map((customerItem) => (
              <li
                key={customerItem._id}
                onClick={() => handleCustomerSelect(customerItem)}
                style={{
                  cursor: 'pointer',
                  padding: '5px',
                  border: '1px solid #ddd',
                  marginBottom: '5px',
                }}
              >
                {customerItem.name} - {customerItem.contactNumber}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Payment Status */}
      <select onChange={(e) => setPaymentStatus(e.target.value)}>
        <option value="Not Paid">Not Paid</option>
        <option value="Paid">Paid</option>
        <option value="Partially Paid">Partially Paid</option>
      </select>

      {/* Payment Method */}
      <select onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="Card">Card</option>
        <option value="Credit">Credit</option>
      </select>

      {/* Product Search */}
      <input
        type="text"
        placeholder="Search Products"
        value={productSearchTerm}
        onChange={(e) => setProductSearchTerm(e.target.value)}
      />

      {/* Products */}
      <div>
        <h3>Products</h3>
        {filteredProducts.map((product) => (
          <div key={product._id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Subtotal: ${calculateSubtotal()}</h3>
      </div>

      <button onClick={handleSubmit}>Complete Sale</button>
    </div>
  );
};

export default BillPage;
