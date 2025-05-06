// InvoicePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../../components/Invoice/Invoice"; // Assuming Invoice component is in the same directory
import { useParams } from "react-router-dom";


const InvoicePage = () => {
  const [transaction, setTransaction] = useState(null);
  const { id } = useParams(); // Get the transaction ID from the URL

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sales/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransaction(response.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [id]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h2>Invoice</h2>
      <Invoice transaction={transaction} /> {/* Pass the fetched transaction data */}
    </div>
  );
};

export default InvoicePage;
