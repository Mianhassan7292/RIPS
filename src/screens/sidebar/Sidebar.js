import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaWarehouse, FaCubes, FaBoxOpen, FaShoppingCart, FaRegListAlt, FaUsers, FaBuilding, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './style.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="dashboard" className="sidebar-item" title="Dashboard">
        <FaHome />
        <span className="sidebar-text">Dashboard</span>
      </Link>
      <Link to="inventory" className="sidebar-item" title="Inventory">
        <FaWarehouse />
        <span className="sidebar-text">Inventory</span>
      </Link>
      <Link to="available-stock" className="sidebar-item" title="Available Stock">
        <FaBoxOpen />
        <span className="sidebar-text">Available Stock</span>
      </Link>
      <Link to="purchase-item" className="sidebar-item" title="Purchase Item">
        <FaShoppingCart />
        <span className="sidebar-text">Purchase Item</span>
      </Link>
      <Link to="request-item" className="sidebar-item" title="Request Item">
        <FaRegListAlt />
        <span className="sidebar-text">Request Item</span>
      </Link>
      <Link to="departments" className="sidebar-item" title="Departments">
        <FaBuilding />
        <span className="sidebar-text">Departments</span>
      </Link>
      <Link to="sellers" className="sidebar-item" title="Sellers">
        <FaUsers />
        <span className="sidebar-text">Sellers</span>
      </Link>
      <Link to="reseller" className="sidebar-item" title="Reseller">
      <FaCubes />
        <span className="sidebar-text">Resellers</span>
      </Link>
      <Link to="profile" className="sidebar-item" title="Profile">
        <FaUser />
        <span className="sidebar-text">Profile</span>
      </Link>
      <Link to="logout" className="sidebar-item" title="Logout">
        <FaSignOutAlt />
        <span className="sidebar-text">Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
