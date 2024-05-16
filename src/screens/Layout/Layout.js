import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Inventory from "../inventory/Inventory";
import Stocks from "../stocks/Stocks";
import Purchase from "../purchase/Purchase";
import Request from "../request/Request";
import Department from "../department/Department";
import Sellers from "../sellers/Sellers";
import Profile from "../profile/Profile";
import Logout from "../logout/Logout";
import Reseller from "../reseller/Reseller";

const Layout = () => {
  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="app-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/available-stock" element={<Stocks />} />
            <Route path="/purchase-item" element={<Purchase />} />
            <Route path="/request-item" element={<Request />} />
            <Route path="/departments" element={<Department />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/reseller" element={<Reseller />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
