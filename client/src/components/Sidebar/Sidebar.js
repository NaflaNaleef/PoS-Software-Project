import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/supplier">Supplier</NavLink>
        </li>
        <li>
          <NavLink to="/customer">Customer</NavLink>
        </li>
        <li>
          <NavLink to="/bill">Bill</NavLink> {/* Link to Category Page */}
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/sales">Sales</NavLink>
        </li>
        <li>
          <NavLink to="/employees">Employees</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

