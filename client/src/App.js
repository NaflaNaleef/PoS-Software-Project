// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import Main from './components/Main';
// import Home from './components/Home/Home';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Sidebar from './components/Sidebar/Sidebar';
// import Dashboard from './Pages/Dashboard/Dashboard';
// import EmployeePage from './Pages/Employee/EmployeePage';
// import CustomerPage from './Pages/Customer/CustomerPage';
// import SupplierPage from './Pages/Supplier/SupplierPage';
// import ProductPage from './Pages/Product/ProductPage';
// import SalesPage from './Pages/Sales/SalesPage';
// import BillsPage from './Pages/Bills/BillsPage';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import InvoicePage from './Pages/InvoicePage/InvoicePage';

// // Check if user is authenticated
// const isAuthenticated = () => {
//   return !!localStorage.getItem("token");
// };

// // Protected Route Wrapper
// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// // Layout for authenticated pages (with Sidebar)
// const AppLayout = () => (
//   <div className="app-container" style={{ display: 'flex' }}>
//     <Sidebar />
//     <div className="content-container" style={{ marginLeft: '250px', flex: 1 }}>
//       <Main />
//       <div style={{ marginTop: '60px', padding: '1rem' }}>
//         <Outlet />
//       </div>
//     </div>
//   </div>
// );

// // Load Stripe outside of component
// const stripePromise = loadStripe('pk_test_51R5U4eED2StRK7aLViqTuosxjsbxJoKo4px42qj00nROwB7Nq7TvzfpU6hOJCXjAJmBR5OEULvgbh9hTglKnXY7u00c7IxsNZQ');

// function App() {
//   const [backendData, setBackendData] = useState([{}]);

//   useEffect(() => {
//     fetch("/").then(
//       response => response.json()
//     ).then(
//       data => {
//         setBackendData(data);
//       }
//     );
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <AppLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/employees" element={<EmployeePage />} />
//           <Route path="/sales" element={
//             <Elements stripe={stripePromise}>
//               <SalesPage />
//             </Elements>
//           } />
//           <Route path="/bills" element={<BillsPage />} />
//           <Route path="/customer" element={<CustomerPage />} />
//           <Route path="/supplier" element={<SupplierPage />} />
//           <Route path="/product" element={<ProductPage />} />
//           <Route path="/invoice/:id" element={<InvoicePage />} />
//         </Route>

//         {/* Default Redirects */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//   // return (

// //     <Router>
// //       <div className="app-container" style={{ display: 'flex' }}>
// //         {/* Conditionally render Sidebar if the user is logged in */}
// //         {user && <Sidebar />}

// //         <div className="content-container" style={{ marginLeft: user ? '250px' : '0', flex: 1 }}>
// //           {/* Main Page Route - Always render Main component */}
// //           <Main />

// //           <div style={{ marginTop: '60px' }}> {/* Add a margin to push content below Main */}
// //             <Routes>
// //               {/* If the user is authenticated, show routes */}
// //               {user ? (
// //                 <>
// //                   <Route path="/dashboard" element={<Dashboard />} />
// //                   <Route path="/employees" element={<EmployeePage />} />
// //                   <Route path="/sales" element={
// //                     <Elements stripe={stripePromise}>
// //                       <SalesPage />
// //                     </Elements>
// //                   } />
// //                   <Route path="/bills" element={<BillsPage />} />
// //                   <Route path="/customer" element={<CustomerPage />} />
// //                   <Route path="/supplier" element={<SupplierPage />} />
// //                   <Route path="/product" element={<ProductPage />} />
// //                   <Route path="/invoice/:id" element={<InvoicePage />}/>
// //                 </>
// //               ) : (
// //                 <>
// //                   {/* Redirect to login if user is not authenticated */}
// //                   <Route path="/" element={<Navigate replace to="/login" />} />
// //                   <Route path="/signup" element={<Signup />} />
// //                   <Route path="/login" element={<Login />} />
// //                 </>
// //               )}
// //             </Routes>
// //           </div>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import Main from './components/Main';
// import Home from './components/Home/Home';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Sidebar from './components/Sidebar/Sidebar';
// import Dashboard from './Pages/Dashboard/Dashboard';
// import EmployeePage from './Pages/Employee/EmployeePage';
// import CustomerPage from './Pages/Customer/CustomerPage';
// import SupplierPage from './Pages/Supplier/SupplierPage';
// import ProductPage from './Pages/Product/ProductPage';
// import SalesPage from './Pages/Sales/SalesPage';
// import BillsPage from './Pages/Bills/BillsPage';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import InvoicePage from './Pages/InvoicePage/InvoicePage';

// // Check if user is authenticated
// const isAuthenticated = () => {
//   return !!localStorage.getItem("token");
// };

// // Protected Route Wrapper
// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

// // Layout for authenticated pages (with Sidebar)
// const AppLayout = () => (
//   <div className="app-container" style={{ display: 'flex' }}>
//     <Sidebar />
//     <div className="content-container" style={{ marginLeft: '250px', flex: 1 }}>
//       <Main />
//       <div style={{ marginTop: '60px', padding: '1rem' }}>
//         <Outlet />
//       </div>
//     </div>
//   </div>
// );

// // Load Stripe outside of component
// const stripePromise = loadStripe('pk_test_51R5U4eED2StRK7aLViqTuosxjsbxJoKo4px42qj00nROwB7Nq7TvzfpU6hOJCXjAJmBR5OEULvgbh9hTglKnXY7u00c7IxsNZQ');

// function App() {
//   const [backendData, setBackendData] = useState([{}]);

//   useEffect(() => {
//     fetch("/").then(
//       response => response.json()
//     ).then(
//       data => {
//         setBackendData(data);
//       }
//     );
//   }, []);

//   return (
//     <div className="App">
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <AppLayout />
//             </ProtectedRoute>
//           }
//         >
// <Route path="/dashboard" element={<Dashboard />} />
// <Route path="/employees" element={<EmployeePage />} />
//           <Route path="/sales" element={
//             <Elements stripe={stripePromise}>
//               <SalesPage />
//             </Elements>
//           } />
//           <Route path="/bills" element={<BillsPage />} />
//           <Route path="/customer" element={<CustomerPage />} />
//           <Route path="/supplier" element={<SupplierPage />} />
//           <Route path="/product" element={<ProductPage />} />
//           <Route path="/invoice/:id" element={<InvoicePage />} />
//         </Route>

//         {/* Default Redirects */}
//         <Route
//           path="*"
//           element={
//             isAuthenticated() ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import EmployeePage from './Pages/Employee/EmployeePage';
import CustomerPage from './Pages/Customer/CustomerPage';
import SupplierPage from './Pages/Supplier/SupplierPage';
import ProductPage from './Pages/Product/ProductPage';
import SalesPage from './Pages/Sales/SalesPage';
import BillsPage from './Pages/Bills/BillsPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InvoicePage from './Pages/InvoicePage/InvoicePage';

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout for authenticated pages (with Sidebar)
const AppLayout = () => (
  <div className="app-container" style={{ display: 'flex' }}>
    <Sidebar />
    <div className="content-container" style={{ marginLeft: '250px', flex: 1 }}>
      <Main />
      <div style={{ marginTop: '60px', padding: '1rem' }}>
        <Outlet />
      </div>
    </div>
  </div>
);

// Load Stripe outside of component
const stripePromise = loadStripe('pk_test_51R5U4eED2StRK7aLViqTuosxjsbxJoKo4px42qj00nROwB7Nq7TvzfpU6hOJCXjAJmBR5OEULvgbh9hTglKnXY7u00c7IxsNZQ');

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

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/sales" element={
            <Elements stripe={stripePromise}>
              <SalesPage />
            </Elements>
          } />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/invoice/:id" element={<InvoicePage />} />
        </Route>

        {/* Default Redirects */}
        <Route
          path="*"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;