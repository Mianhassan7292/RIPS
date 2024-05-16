import React from "react";
import { useNavigate } from "react-router-dom";

const SellerLogout = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <div
      style={{
        // height: "85vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <h1 style={{ fontSize: "50px" }}>LOGOUT</h1>
      <p style={{ marginTop: "-10px" }}>
        Thanks for using{" "}
        <span style={{ fontWeight: "600", fontSize: "20px" }}>RIPS</span>
      </p>
      <button
        style={{
          border: "none",
          width: "150px",
          backgroundColor: "rgb(240, 57, 57)",
          color: "white",
          fontSize: "15px",
          fontWeight: "700",
          padding: "5px",
          borderRadius: "5px",
          cursor:"pointer"
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default SellerLogout;
