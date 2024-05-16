import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("admin");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          email,
          password,
          loginType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        NotificationManager.success("Logged in successfully");
        localStorage.clear();
        localStorage.setItem("current_user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);

        const current_user = localStorage.getItem("current_user");
        const user = JSON.parse(current_user);

        if (user?.existUser?.loginType == "seller") {
          navigate("/sellerLayout/sellerInventory");
        } else {
          navigate("/layout/dashboard");
        }

        setLoading(false);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
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
            <label>Login as:</label>
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
            {loading ? <ClipLoader size={15} color="white" /> : "Login"}
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <span>
              New User?{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
