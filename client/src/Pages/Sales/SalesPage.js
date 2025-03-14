import React, { useState, useEffect } from "react";
import axios from "axios";
import BarcodeScanner from "../../components/BarcodeScanner/BarcodeScanner";
import { toast } from "react-toastify";
import './salesPage.css';

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [lastScanned, setLastScanned] = useState(null);
  const [customers, setCustomers] = useState([]); // New state for customers
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    axios.get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));

    // Fetch customers when the component mounts
    axios.get("/api/customers")
      .then((res) => setCustomers(res.data.customers))
      .catch((err) => console.error(err));
  }, []);

  const handleBarcodeScan = (barcode) => {
    if (lastScanned === barcode) return; // Prevent duplicate scans

    setLastScanned(barcode);

    const product = products.find((p) => p.barcode === barcode);
    if (product) {
      addToCart(product);
    } else {
      toast.error("Product not found!");
    }

    // Reset last scanned barcode after a short delay to allow new scans
    setTimeout(() => setLastScanned(null), 2000);
  };

  const addToCart = (product) => {
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      
      if (existing) {
        if (existing.quantity >= product.quantity) {
          toast.error(`Only ${product.quantity} items available in stock!`);
          return prev; // Prevent exceeding stock
        }
        return prev.map((item) =>
          item._id === product._id 
            ? { ...item, quantity: Math.min(item.quantity + 1, product.quantity) } 
            : item
        );
      }

      // Ensure product is available before adding
    if (product.quantity > 0) {
      return [...prev, { ...product, quantity: 1 }];
    } else {
      toast.error(`This product is out of stock!`);
      return prev;
    }
  });
};

const updateQuantity = (productId, change) => {
  setCart((prev) =>
    prev.map((item) => {
      if (item._id === productId) {
        const product = products.find((p) => p._id === productId);
        if (!product) return item;

        const newQuantity = item.quantity + change;

        if (newQuantity > product.quantity) {
          toast.error(`Only ${product.quantity} items available in stock!`);
          return item; // Prevent exceeding stock
        }

        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    })
  );
};

  
const handleManualQuantityChange = (productId, value) => {
  setCart((prev) =>
    prev.map((item) =>
      item._id === productId ? { ...item, quantity: value } : item
    )
  );
};

const handleQuantityBlur = (productId, value) => {
  const newQuantity = parseInt(value, 10);
  setCart((prev) =>
    prev.map((item) => {
      if (item._id === productId) {
        const product = products.find((p) => p._id === productId);
        if (!product) return item;

        return {
          ...item,
          quantity: isNaN(newQuantity) || newQuantity < 1
            ? 1
            : Math.min(newQuantity, product.quantity),
        };
      }
      return item;
    })
  );
};


  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!customer) return toast.error("Select a customer");
    if (cart.length === 0) return toast.error("Cart is empty");

    const transaction = {
      customer: customer._id,
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      totalAmount,
      paymentMethod,
    };

    try {
      const response = await axios.post("/api/sales", transaction);
      console.log("Checkout Response:", response.data); // Debugging
  
      toast.success("Transaction successful!");
  
      // Clear cart and reset UI state
      setCart([]);
  
      // Reduce stock in the frontend
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          const soldItem = cart.find((item) => item._id === product._id);
          return soldItem
            ? { ...product, quantity: product.quantity - soldItem.quantity }
            : product;
        })
      );
  
    } catch (error) {
      console.error("Checkout Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Transaction failed!");
    }
  };

  // Filter customers based on search input
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sales-page">
      <h2>Sales Page</h2>

      <div className="page-content">
        <div className="content-container">
          <div className="product-selection">
            {/* Product Selection */}
            <select
              onChange={(e) => {
                const selectedProduct = products.find((p) => p._id === e.target.value);
                addToCart(selectedProduct);
              }}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id} disabled={product.quantity === 0}>
                {product.name} - ${product.price} (Stock: {product.quantity})
              </option>
              ))}
            </select>
          </div>

          <div className="scanner-container">
            {/* Barcode Scanner */}
            <BarcodeScanner onScan={handleBarcodeScan} />
          </div>
        </div>

        {/* Cart and Payment Section */}
        <div className="cart-payment-container">
          <div className="cart-container">
            <h3>Cart</h3>
            {cart.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>
                        <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleManualQuantityChange(item._id, e.target.value)}
                          onBlur={(e) => handleQuantityBlur(item._id, e.target.value)}
                          style={{ width: "50px", textAlign: "center" }}
                        />
                        <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                      </td>
                      <td>{item.price}</td>
                      <td>{(item.quantity * item.price).toFixed(2)}</td>
                      <td>
                        <button onClick={() => setCart(cart.filter((c) => c._id !== item._id))}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Cart is empty</p>
            )}

            <h3>Sub Total: Rs. {totalAmount.toFixed(2)}</h3>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <div>
              <label>Customer:</label>
              {/* Customer Search Input */}
              <input
                type="text"
                placeholder="Search by Name or Phone"
                value={customer.name || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <ul className="customer-search-results">
                  {filteredCustomers.map((customer) => (
                    <li
                      key={customer._id}
                      onClick={() => {
                        setCustomer(customer); // Set selected customer
                        setSearchTerm(""); // Clear search term
                      }}
                    >
                      {customer.name} - {customer.phone}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label>Payment Method:</label>
              {/* Payment Method Buttons */}
              <div className="payment-method-buttons">
                <button
                  onClick={() => setPaymentMethod("Cash")}
                  className={paymentMethod === "Cash" ? "selected" : ""}
                >
                  Cash
                </button>
                <button
                  onClick={() => setPaymentMethod("Card")}
                  className={paymentMethod === "Card" ? "selected" : ""}
                >
                  Card
                </button>
                {/* <button
                  onClick={() => setPaymentMethod("Credit")}
                  className={paymentMethod === "Credit" ? "selected" : ""}
                >
                  Credit
                </button> */}

                <button onClick={handleCheckout}>Checkout</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
