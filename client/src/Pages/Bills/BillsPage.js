import React, { useEffect, useState } from "react";
import axios from "axios";

const BillPage = () => {
  const [transactions, setTransactions] = useState([]);
  const recentSaleId = localStorage.getItem("recentSaleId");

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Delete transaction
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h2>Transaction History</h2>

      {recentSaleId && (
        <p style={{ color: "green" }}>
          ✅ Recent transaction (Sale ID: {recentSaleId}) has been recorded and highlighted below.
        </p>
      )}

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Customer Name</th>
            <th>Payment Method</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              style={transaction._id === recentSaleId ? { backgroundColor: "#e0ffe0" } : {}}
            >
              <td>
                {/* Displaying all the product names from the transaction */}
                {transaction.items.map((item, index) => (
                  <div key={index}>
                    {item.product.name}
                  </div>
                ))}
              </td>

              <td>
                {/* Displaying quantities for each product */}
                {transaction.items.map((item, index) => (
                  <div key={index}>
                    {item.quantity}
                  </div>
                ))}
              </td>

              <td>
                {/* Displaying price for each product */}
                {transaction.items.map((item, index) => (
                  <div key={index}>
                    Rs. {item.price}
                  </div>
                ))}
              </td>

              <td>
                {/* Displaying total price for each product */}
                {transaction.items.map((item, index) => (
                  <div key={index}>
                    Rs. {item.total}
                  </div>
                ))}
              </td>

              {/* Displaying customer name */}
              <td>{transaction.customer?.name || "Unknown"}</td>

              <td>{transaction.paymentMethod}</td>
              <td>
                <button onClick={() => handleDelete(transaction._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillPage;
