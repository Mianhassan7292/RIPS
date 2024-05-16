import React, { useEffect, useState } from "react";
import "./style.css";
import { FaBoxOpen, FaShoppingCart, FaShapes, FaSpa } from "react-icons/fa";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const Dashboard = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  useEffect(() => {
    getDashboardData();
    getDashboardData2();
    getDashboardData3();
  }, []);

  useEffect(() => {
    if (data3) {
      const productData = [
        {
          month: "Jan",
          products: data3.filter((e) => e._id.month === 1)[0]?.count
            ? data3.filter((e) => e._id.month === 1)[0]?.count
            : 0,
        },
        {
          month: "Feb",
          products: data3.filter((e) => e._id.month === 2)[0]?.count
            ? data3.filter((e) => e._id.month === 2)[0]?.count
            : 0,
        },
        {
          month: "Mar",
          products: data3.filter((e) => e._id.month === 3)[0]?.count
            ? data3.filter((e) => e._id.month === 3)[0]?.count
            : 0,
        },
        {
          month: "Apr",
          products: data3.filter((e) => e._id.month === 4)[0]?.count
            ? data3.filter((e) => e._id.month === 4)[0]?.count
            : 0,
        },
        {
          month: "May",
          products: data3.filter((e) => e._id.month === 5)[0]?.count
            ? data3.filter((e) => e._id.month === 5)[0]?.count
            : 0,
        },
        {
          month: "Jun",
          products: data3.filter((e) => e._id.month === 6)[0]?.count
            ? data3.filter((e) => e._id.month === 6)[0]?.count
            : 0,
        },
        {
          month: "Jul",
          products: data3.filter((e) => e._id.month === 7)[0]?.count
            ? data3.filter((e) => e._id.month === 7)[0]?.count
            : 0,
        },
        {
          month: "Aug",
          products: data3.filter((e) => e._id.month === 8)[0]?.count
            ? data3.filter((e) => e._id.month === 8)[0]?.count
            : 0,
        },
        {
          month: "Sep",
          products: data3.filter((e) => e._id.month === 9)[0]?.count
            ? data3.filter((e) => e._id.month === 9)[0]?.count
            : 0,
        },
        {
          month: "Oct",
          products: data3.filter((e) => e._id.month === 10)[0]?.count
            ? data3.filter((e) => e._id.month === 10)[0]?.count
            : 0,
        },
        {
          month: "Nov",
          products: data3.filter((e) => e._id.month === 11)[0]?.count
            ? data3.filter((e) => e._id.month === 11)[0]?.count
            : 0,
        },
        {
          month: "Dec",
          products: data3.filter((e) => e._id.month === 12)[0]?.count
            ? data3.filter((e) => e._id.month === 12)[0]?.count
            : 0,
        },
      ];

      const productGraphContainer = document.getElementById(
        "productGraphContainer"
      );
      productGraphContainer.innerHTML = "";

      productData.forEach((monthData) => {
        const monthBar = document.createElement("div");
        monthBar.classList.add("month-bar");

        const monthLabel = document.createElement("div");
        monthLabel.classList.add("month-label");
        monthLabel.textContent = monthData.month;

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${2 + monthData.products * 0.3}rem`;

        bar.textContent = monthData.products;

        monthBar.appendChild(monthLabel);
        monthBar.appendChild(bar);

        productGraphContainer.appendChild(monthBar);
      });
    }
  }, [data3]);

  const getDashboardData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/count/product`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
      });
  };

  const getDashboardData2 = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/count/request/product`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData2(res?.data);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
      });
  };

  const getDashboardData3 = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/count/monthly/record`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData3(res?.data);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
      });
  };

  return (
    <>
      <div>
        <div className="first-row">
          <div className="first-div">
            <div className="div-heading">
              <h2 style={{ color: "white" }}>{data?.totalProducts}</h2>
              <p style={{ color: "white" }}>Total Products</p>
            </div>
            <div className="div-logo">
              <FaBoxOpen
                style={{
                  color: "white",
                  height: "80px",
                  width: "60px",
                  opacity: "40%",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
          <div className="second-div">
            <div className="div-heading">
              <h2 style={{ color: "white" }}>{data?.availableProducts}</h2>
              <p style={{ color: "white" }}>Available products</p>
            </div>
            <div className="div-logo">
              <FaShapes
                style={{
                  color: "white",
                  height: "80px",
                  width: "60px",
                  opacity: "40%",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
          <div className="third-div">
            <div className="div-heading">
              <h2 style={{ color: "white" }}>{data?.purchasedProducts}</h2>
              <p style={{ color: "white" }}>Purchased products</p>
            </div>
            <div className="div-logo">
              <FaShoppingCart
                style={{
                  color: "white",
                  height: "80px",
                  width: "60px",
                  opacity: "40%",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
          <div className="forth-div">
            <div className="div-heading">
              <h2 style={{ color: "white" }}>{data2?.requestedProducts}</h2>
              <p style={{ color: "white" }}>Requested product</p>
            </div>
            <div className="div-logo">
              <FaSpa
                style={{
                  color: "white",
                  height: "80px",
                  width: "60px",
                  opacity: "40%",
                  marginTop: "20px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="product-graph-container"
          id="productGraphContainer"
        ></div>
      </div>
    </>
  );
};

export default Dashboard;
