import React from "react";

const Invoice = React.forwardRef(({ transaction }, ref) => {
  const {
    invoiceNumber,
    customer,
    paymentMethod,
    paymentStatus,
    items = [],
    subtotal = 0,
    discount = 0,
    taxRate = 0,
    taxAmount = 0,
    totalAmount = 0,
    date,
  } = transaction || {};

  return (
    <div
      ref={ref}
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #ddd",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>MAM Stores</h1>
        <p>524/1, Heyley Road, Haliwala, Galle | Phone: +91 773965339</p>
      </div>

      <h2 style={{ textAlign: "center", textDecoration: "underline" }}>INVOICE</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <p><strong>Invoice Number:</strong> {invoiceNumber || "N/A"}</p>
          <p>
  <strong>Date:</strong>{" "}
  {new Date(date || Date.now()).toLocaleDateString()}{" "}
  {new Date(date || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
</p>

        </div>
        <div>
          <p><strong>Payment Method:</strong> {paymentMethod || "N/A"}</p>
          <p><strong>Payment Status:</strong> {paymentStatus || "N/A"}</p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={tableHeaderStyle}>Product Name</th>
            <th style={tableHeaderStyle}>Qut.</th>
            <th style={tableHeaderStyle}>Unit Price</th>
            <th style={tableHeaderStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const price = item.product?.price ?? 0;
            const total = item.quantity * price;
            return (
              <tr key={index}>
                <td style={tableCellStyle}>{item.product?.name || "Unknown"}</td>
                <td style={tableCellStyle}>{item.quantity}</td>
                <td style={tableCellStyle}>Rs. {price.toFixed(2)}</td>
                <td style={tableCellStyle}>Rs. {total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ textAlign: "right", fontSize: "16px" }}>
        <p><strong>Subtotal:</strong> Rs. {totalAmount.toFixed(2)}</p>
        <p><strong>Discount ({discount}%):</strong> -Rs. {(subtotal * (discount / 100)).toFixed(2)}</p>
        <p><strong>Tax ({taxRate}%):</strong> Rs. {taxAmount.toFixed(2)}</p>
        <h3><strong>Grand Total:</strong> Rs. {totalAmount.toFixed(2)}</h3>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>
        <p>Thank you for shopping with us!</p>
        <p>For any queries, contact mamstores@gmail.com</p>
      </div>
    </div>
  );
});

const tableHeaderStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

export default Invoice;
