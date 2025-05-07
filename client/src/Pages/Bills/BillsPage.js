// BillsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory hook for navigation
import { Typography } from '@mui/material';

const BillsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  
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

  // View Invoice
  const handleViewInvoice = (id) => {
    navigate(`/invoice/${id}`); // Redirect to invoice page using useHistory
  };

  return (
    <div>
                  <Typography variant="h4" gutterBottom component="div" sx={{ mt: 3, mb: 3 }}> All Transactions</Typography>
      
      <table>
        <thead>
          <tr>
            
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Payment Method</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.customer?.name || "Unknown"}</td>
              <td>Rs.{transaction.totalAmount.toFixed(2)}</td>
              <td>{transaction.paymentStatus}</td>
              <td>{transaction.paymentMethod}</td>
              <td>
                {transaction.items.map((item, index) => (
                  <div key={index}>
                    {item.product?.name || "Unknown"} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleViewInvoice(transaction._id)}>Invoice</button>
                <button onClick={() => handleDelete(transaction._id)} style={{ marginLeft: "5px", color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillsPage;
