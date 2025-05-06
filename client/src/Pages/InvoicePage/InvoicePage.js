// InvoicePage.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Invoice from "../../components/Invoice/Invoice";
import { useParams } from "react-router-dom";

const InvoicePage = () => {
  const [transaction, setTransaction] = useState(null);
  const { id } = useParams();
  const printRef = useRef();

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

  const handlePrint = () => {
    window.print();
  };

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="no-print">Invoice</h2>
      <button className="no-print" onClick={handlePrint} style={{ marginBottom: "20px" }}>
        Print
      </button>
      <div ref={printRef} className="printable">
        <Invoice transaction={transaction} />
      </div>
    </div>
  );
};

export default InvoicePage;


