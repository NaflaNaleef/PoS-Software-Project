import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = ({ transaction }) => {
  console.log("useReactToPrint:", useReactToPrint);
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current || document.createElement("div"),
  });

  if (!transaction) return <p>Loading...</p>;

  const formattedDate = transaction?.date ? new Date(transaction.date).toLocaleDateString() : "N/A";
  const formattedTime = transaction?.date ? new Date(transaction.date).toLocaleTimeString() : "N/A";

  return (
    <div>
      <div ref={invoiceRef} className="invoice-container" style={{ padding: "20px", border: "1px solid #000", maxWidth: "600px", margin: "auto", backgroundColor: "#fff" }}>
        <h1 style={{ textAlign: "center", marginBottom: "5px" }}>MAM Stores</h1>
        <p style={{ textAlign: "center", margin: "0", fontSize: "14px" }}>
          Address: Heyley Road, Haliwala, Galle | Phone: +94 77-396-5339
        </p>
        <hr />
        <h3 style={{ textAlign: "center" }}>Invoice #{transaction.invoiceNumber || "N/A"}</h3>
        <p><strong>Date:</strong> {formattedDate} | <strong>Time:</strong> {formattedTime}</p>
        <p><strong>Customer:</strong> {transaction.customer?.name || "N/A"}</p>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ textAlign: "left", padding: "5px" }}>Product</th>
              <th style={{ textAlign: "center", padding: "5px" }}>Quantity</th>
              <th style={{ textAlign: "right", padding: "5px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "5px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items?.map((item) => (
              <tr key={item._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "5px" }}>{item.product?.name || "Unknown"}</td>
                <td style={{ textAlign: "center", padding: "5px" }}>{item.quantity}</td>
                <td style={{ textAlign: "right", padding: "5px" }}>Rs. {item.price?.toFixed(2)}</td>
                <td style={{ textAlign: "right", padding: "5px" }}>Rs. {item.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 style={{ textAlign: "right", marginTop: "10px" }}>Total Amount: Rs. {transaction.totalAmount?.toFixed(2)}</h3>
        <hr />
        <p style={{ textAlign: "center", fontSize: "16px", marginTop: "20px", fontWeight: "bold" }}>
          Thank you for shopping with us! Visit again.
        </p>
      </div>
      <button onClick={handlePrint} style={{ display: "block", margin: "20px auto", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
        Print Invoice
      </button>
    </div>
  );
};

export default Invoice;
