import React, { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../../components/Invoice/Invoice";


const BillPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
  const handleViewInvoice = (transactionId) => {
    // Find the full transaction object using the ID
    const transaction = transactions.find((txn) => txn._id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction); // Set selected transaction for modal
    } else {
      console.error("Transaction not found:", transactionId);
    }
  };
  

  // Close Invoice Modal
  const handleCloseInvoice = () => {
    setSelectedTransaction(null);
  };

  return (
    <div>
      <h2>All Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Payment Method</th>
            <th>Items</th>
            <th>Actions</th> {/* Added Action Column */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.invoiceNumber}</td>
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

       {/* Invoice Modal */}
       {selectedTransaction && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseInvoice}>
              &times;
            </span>
            <Invoice transaction={selectedTransaction} />
          </div>
        </div>
      )}

    </div>
  );
};

export default BillPage;

