import React, { useState, useEffect } from "react";
import axios from "axios";
import BarcodeScanner from "../../components/BarcodeScanner/BarcodeScanner";
import { toast } from "react-toastify";
import './salesPage.css';
import PaymentForm from "../../components/PaymentForm/PaymentForm"; // Ensure this is imported
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe outside of component to avoid reloading on each render
const stripePromise = loadStripe("pk_test_51R5U4eED2StRK7aLViqTuosxjsbxJoKo4px42qj00nROwB7Nq7TvzfpU6hOJCXjAJmBR5OEULvgbh9hTglKnXY7u00c7IxsNZQ");

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [lastScanned, setLastScanned] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPayment, setShowPayment] = useState(false);

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

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate total amount

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
      console.log("Checkout Response:", response.data);

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
            <select
              onChange={(e) => {
                const selectedProduct = products.find((p) => p._id === e.target.value);
                addToCart(selectedProduct);
              }}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id} disabled={product.quantity === 0}>
                  {product.name} - Rs. {product.price} (Stock: {product.quantity})
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
                      <td>{item.quantity}</td>
                      <td>Rs. {item.price}</td>
                      <td>Rs. {(item.quantity * item.price).toFixed(2)}</td>
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
              <div className="payment-method-buttons">
                <button
                  onClick={() => setPaymentMethod("Cash")}
                  className={paymentMethod === "Cash" ? "selected" : ""}
                >
                  Cash
                </button>
                <button
                  onClick={() => {
                    setPaymentMethod("Card");
                    setShowPayment(true); // Show payment form when card is selected
                  }}
                  className={paymentMethod === "Card" ? "selected" : ""}
                >
                  Card
                </button>

                {/* Conditional Rendering of PaymentForm with Elements wrapper */}
                {showPayment && paymentMethod === "Card" && (
                  <div className="payment-modal">
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        amount={totalAmount} // Pass the totalAmount here
                        paymentMethod={paymentMethod}
                        onSuccess={() => {
                          alert("Payment Successful!");
                          setShowPayment(false); // Close Payment Form after success
                        }}
                      />
                    </Elements>
                    <button onClick={() => setShowPayment(false)}>Close</button>
                  </div>
                )}

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
