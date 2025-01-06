import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import EmployeePage from './Pages/Employee/EmployeePage';
import Bill from './Pages/Bill/BillPage';
import CustomerPage from './Pages/Customer/CustomerPage';
import SupplierPage from './Pages/Supplier/SupplierPage';
import AddProduct from './components/AddProduct/AddProduct';
import Product from './Pages/Product/Product';

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
        {/* Conditionally render Sidebar if the user is logged in */}
        {user && <Sidebar />}

        <div className="content-container" style={{ marginLeft: user ? '250px' : '0', flex: 1 }}>
          {/* Main Page Route - Always render Main component */}
            {/* Header and Navigation */}
            {!user && (
            <>
              
              <nav
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  padding: "10px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Link
                  to="/add-product"
                  style={{
                    textDecoration: "none",
                    color: "#3bb19b",
                    fontSize: "18px",
                  }}
                >
                  Add Products
                </Link>
                <Link
                  to="/product"
                  style={{
                    textDecoration: "none",
                    color: "#3bb19b",
                    fontSize: "18px",
                  }}
                >
                  Products
                </Link>
              </nav>
            </>
          )}
          
          <Main />

          <div style={{ marginTop: '60px' }}> {/* Add a margin to push content below Main */}
            <Routes>
              {/* If the user is authenticated, show routes */}
              {user ? (
                <>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/employees" element={<EmployeePage/>}></Route>
                <Route path="/bill" element={<Bill/>}></Route>
                <Route path="/customer" element={<CustomerPage/>}></Route>
                <Route path="/supplier" element={<SupplierPage/>}></Route>
                
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
