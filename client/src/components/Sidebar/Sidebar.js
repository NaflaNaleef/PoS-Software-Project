import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/supplier">Supplier</Link>
        </li>
        <li>
          <Link to="/customer">Customer</Link>
        </li>
        <li>
          <Link to="/category">Category</Link> {/* Link to Category Page */}
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
        <li>
          <Link to="/employees">Employees</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

