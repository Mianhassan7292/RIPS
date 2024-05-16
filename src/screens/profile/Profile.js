import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { NotificationManager } from "react-notifications";

const Profile = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get/user/by/id`, {
        headers: headers,
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPhone(res.data.phone);
      })
      .catch((err) => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/update/profile`,
        { firstName, lastName, phone },
        {
          headers: headers,
        }
      )
      .then((res) => {
        NotificationManager.success("Profile Updated");
      })
      .catch((err) => {});
  };

  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/change/password`,
        { password: password, password_confirmation: cpassword },
        {
          headers: headers,
        }
      )
      .then((res) => {
        NotificationManager.success("Password Updated");
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "25px" }}>Genral Info</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label-text" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-control-a"
            />
          </div>
          <div className="form-group">
            <label className="label-text" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-control-a"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label-text" htmlFor="phone">
              Phone No:
            </label>
            <br />
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-control-a"
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            style={{
              border: "none",
              width: "150px",
              backgroundColor: "rgb(240, 57, 57)",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "20px 0px 10px 0px",
            }}
          >
            Save
          </button>
        </div>
      </form>

      <h2 style={{ fontSize: "25px" }}>Change Password</h2>
      <form className="product-form" onSubmit={handleChangeSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label-text" htmlFor="firstName">
              Password:
            </label>
            <input
              type="password"
              id="firstName"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control-a"
            />
          </div>
          <div className="form-group">
            <label className="label-text" htmlFor="lastName">
              Confirm Password:
            </label>
            <input
              type="password"
              id="lastName"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              required
              className="form-control-a"
            />
          </div>
        </div>

        <div className="form-group">
          <button
            type="submit"
            style={{
              border: "none",
              width: "150px",
              backgroundColor: "rgb(240, 57, 57)",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "20px 0px 10px 0px",
            }}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
