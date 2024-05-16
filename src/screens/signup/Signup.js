import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { ClipLoader } from "react-spinners";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loginType, setLoginType] = useState("admin");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        {
          email,
          password,
          loginType,
          phone,
          firstName,
          lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        NotificationManager.success("Account Created successfully");
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <h2>Create Your Account</h2>
        <form className="signup-form" onSubmit={handleLogin}>
          <div>
            <input
              style={{ width: "95%", borderRadius: "5px" }}
              placeholder="Enter First Name"
              required
              type="text"
              id="fistName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              style={{ width: "95%", borderRadius: "5px" }}
              placeholder="Enter Last Name"
              required
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              style={{ width: "95%", borderRadius: "5px" }}
              placeholder="Enter Email"
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              style={{ width: "95%", borderRadius: "5px" }}
              placeholder="Enter Phone No."
              required
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              minLength={6}
              maxLength={20}
              style={{ width: "95%", borderRadius: "5px" }}
              placeholder="Enter Password"
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ display: "flex" }}>
            <label>Account as:</label>
            <div style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                id="admin"
                name="loginType"
                value="admin"
                checked={loginType === "admin"}
                onChange={() => setLoginType("admin")}
              />
              <label htmlFor="admin">Admin</label>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                id="seller"
                name="loginType"
                value="seller"
                checked={loginType === "seller"}
                onChange={() => setLoginType("seller")}
              />
              <label htmlFor="seller">Seller</label>
            </div>
          </div>
          <button style={{ marginTop: "30px" }} type="submit">
            {loading ? (
              <ClipLoader size={15} color="white" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
