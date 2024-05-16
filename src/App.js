import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/login/Login";
import Signup from "./screens/signup/Signup";
import Layout from "./screens/Layout/Layout";
import "./App.css";
import Dashboard from "./screens/dashboard/Dashboard";
import Inventory from "./screens/inventory/Inventory";
import Stocks from "./screens/stocks/Stocks";
import Purchase from "./screens/purchase/Purchase";
import Request from "./screens/request/Request";
import Department from "./screens/department/Department";
import Sellers from "./screens/sellers/Sellers";
import Profile from "./screens/profile/Profile";
import Logout from "./screens/logout/Logout";
import SellerInventory from "./screens/sellerInventory/SellerInventory";

import SellerLayout from "./screens/sellerLayout/SellerLayout";
import SellerProfile from "./screens/sellerProfile/SellerProfile";
import SellerLogout from "./screens/sellerLogout/SellerLogout";
import Reseller from "./screens/reseller/Reseller";

const App = () => {
  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(current_user);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/layout/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="available-stock" element={<Stocks />} />
          <Route path="purchase-item" element={<Purchase />} />
          <Route path="request-item" element={<Request />} />
          <Route path="departments" element={<Department />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="reseller" element={<Reseller />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/sellerLayout/" element={<SellerLayout />}>
          <Route path="sellerInventory" element={<SellerInventory />} />
          <Route path="sellerProfile" element={<SellerProfile />} />
          <Route path="sellerLogout" element={<SellerLogout />} />
        </Route>
      </Routes>
    </Router>
    // <Router>
    //   <Layout />
    // </Router>
  );
};

export default App;
