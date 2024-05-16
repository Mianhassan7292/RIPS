import React from "react";
import Navbar from "../navbar/Navbar";
import SellerSidebar from "../sellerSidebar/SellerSidebar";
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
import SellerInventory from "../sellerInventory/SellerInventory";
import SellerProfile from "../sellerProfile/SellerProfile";
import SellerLogout from "../sellerLogout/SellerLogout";

const SellerLayout = () => {
  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="app-container">
        <div className="sidebar-container">
          <SellerSidebar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/sellerInventory" element={<SellerInventory />} />
            <Route path="/sellerProfile" element={<SellerProfile />} />
            <Route path="/sellerLogout" element={<SellerLogout />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
