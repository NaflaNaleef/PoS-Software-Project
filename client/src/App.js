import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import EmployeePage from './Pages/Employee/EmployeePage';
import CustomerPage from './Pages/Customer/CustomerPage';
import SupplierPage from './Pages/Supplier/SupplierPage';
import AddProduct from './components/AddProduct/AddProduct';
import Product from './Pages/Product/Product';
import BillPage from './Pages/Bill/BillPage';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    );
  }, []);

  const user = localStorage.getItem("token");

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        {/* Only render Sidebar and Main if user is logged in */}
        {user && <Sidebar />}

        <div className="content-container" style={{ marginLeft: user ? '250px' : '0', flex: 1 }}>
          {/* Main Page Route - Always render Main component */}
          <Main />

          <div style={{ marginTop: '60px' }}>
            <Routes>
              {/* If user is authenticated, show routes with Sidebar and Main */}
              {user ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employees" element={<EmployeePage />} />
                  <Route path="/bill" element={<BillPage />} />
                  <Route path="/customer" element={<CustomerPage />} />
                  <Route path="/supplier" element={<SupplierPage />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/product" element={<Product />} />
                </>
              ) : (
                <>
                  {/* Redirect to login if user is not authenticated */}
                  <Route path="/" element={<Navigate replace to="/login" />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
