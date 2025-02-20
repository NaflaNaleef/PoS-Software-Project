import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = ({ transaction }) => {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <div>
      <div ref={invoiceRef} className="invoice-container">
        <h2>Invoice #{transaction.invoiceNumber}</h2>
        <p>Customer: {transaction.customer.name}</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items.map((item) => (
              <tr key={item._id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Amount: Rs. {transaction.totalAmount}</h3>
      </div>
      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default Invoice;
