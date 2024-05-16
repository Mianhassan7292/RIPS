import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import "./style.css";

const Request = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [componentLoading, setComponentLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/create/request/inventory`, {
        productName,
        productType,
        price,
        description,
        quantity,
      })
      .then((res) => {
        // NotificationManager.success("Re");
        getRequestedProducts();
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
      });

    const emailBody = `
      Product Name: ${productName}
      Product Type: ${productType}
      Description: ${description}
      Price: ${price}
      Quantity: ${quantity}
    `;

    // Open the user's default email client with the email body
    window.location.href = `mailto:your-email@example.com?subject=New Product Request&body=${encodeURIComponent(
      emailBody
    )}`;
  };

  useEffect(() => {
    getRequestedProducts();
  }, []);

  const getRequestedProducts = async () => {
    setComponentLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get/request/inventory`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProductsList(res?.data);
        setComponentLoading(false);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setComponentLoading(false);
      });
  };

  const handleAddToInventory = async (item) => {
    const { _id, ProductName, ProductType, price, quantity } = item;
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/create/inventory`,
        {
          price: price,
          quantity: quantity,
          productName: ProductName,
          productType: ProductType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        await axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/delete/request/inventory`,
            {
              id: _id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
          })
          .catch((err) => {
            NotificationManager.error(`${err?.response?.data?.message}`);
          });
        NotificationManager.success("Product Add To Inventory");
        getRequestedProducts();
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
      });
  };
  const itemsPerPage = 10;

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = productsList?.filter((item) =>
    item.ProductName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <h2 style={{ fontSize: "25px" }}>Request for Inventory</h2>
        <p style={{ fontFamily: "sans-serif", fontSize: "18px" }}>
          Request the product from the principal. Please fill out the form below
          and write the product you need. Once submitted, and send email to the
          principal.
        </p>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="label-text" htmlFor="productName">
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="form-control-a"
              />
            </div>
            <div className="form-group">
              <label className="label-text" htmlFor="productType">
                Product Type:
              </label>
              <input
                type="text"
                id="productType"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                required
                className="form-control-a"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="label-text" htmlFor="quantity">
                Product Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="form-control-a"
              />
            </div>
            <div className="form-group">
              <label className="label-text" htmlFor="price">
                Product Price:
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="form-control-a"
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5px",
              marginBottom: "5px",
              marginLeft: "20px",
              marginRight: "20px",
              width: "100%",
            }}
          >
            <label className="label-text" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-control-a"
            ></textarea>
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
              Send Email
            </button>
          </div>
        </form>
      </div>

      <div style={{ margin: "10px", marginTop: "40px" }}>
        <h1>Requested Items</h1>
        <div className="search-add-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={handleChangeSearch}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Quantity Requested</th>
              <th>Price</th>
              <th>Add to Inventory</th>
            </tr>
          </thead>
          {componentLoading ? (
            <tbody>
              <tr>
                <td colSpan="8" className="centered-cell">
                  <div>
                    <ClipLoader size={50} color="red" />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.ProductName}</td>
                  <td>{item.ProductType}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleAddToInventory(item)}>
                      Add To Inventory
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <div>
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Request;
