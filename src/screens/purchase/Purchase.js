import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { NotificationManager } from "react-notifications";

import { CModal, CModalBody } from "@coreui/react";
const Purchase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [addProductloading, setAddProductloading] = useState(false);
  const [componentLoading, setComponentLoading] = useState(false);

  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [actualQuantity, setActualQuantity] = useState("");
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    getInventoryData();
  }, []);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  const getInventoryData = async () => {
    setComponentLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get/seller/product`, {
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

  const openModal = (item) => {
    const { productName, productType, price, quantity } = item;
    setName(productName);
    setProductType(productType);
    setPrice(price);
    setActualQuantity(quantity);
    setShowModal(true);
  };
  const handleCloseAddProductModal = () => {
    setShowModal(false);
    setName("");
    setProductType("");
    setQuantity("");
    setPrice("");
  };

  const handleBuyProduct = async (e) => {
    setAddProductloading(true);
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/add/seller/product`,
        {
          price: price,
          quantity: quantity,
          productName: name,
          productType: productType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setShowModal(false);
        getInventoryData();
        NotificationManager.success("Product Purchased");
        setAddProductloading(false);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setAddProductloading(false);
      });
  };

  const itemsPerPage = 10;

  const filteredData = productsList?.filter((item) =>
    item.productName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ margin: "10px" }}>
      <div className="search-add-container">
        <h1>Buy Seller Products</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Purchase Items</th>
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
                <td>{item.productName}</td>
                <td>{item.productType}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  {/* <button onClick={() => handleBuyProduct(item)}>
                    Buy Product
                  </button> */}
                  <button onClick={() => openModal(item)}>Buy Product</button>
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
      {showModal ? (
        <CModal
          show={showModal}
          // onClose={toggle}
          style={{
            zIndex: 1000,
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CModalBody>
            <div className="add-modal-main-div">
              <div>
                <AiOutlineCloseCircle
                  size={30}
                  onClick={handleCloseAddProductModal}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 100,
                    cursor: "pointer",
                  }}
                />
              </div>
              <h3 style={{ textAlign: "center" }}>Buy Product</h3>
              <form className="signup-form" onSubmit={handleBuyProduct}>
                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Product Name"
                    required
                    type="text"
                    id="name"
                    value={name}
                  />
                </div>
                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Product Type"
                    required
                    type="text"
                    id="productType"
                    value={productType}
                  />
                </div>
                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Price"
                    required
                    type="number"
                    id="price"
                    value={price}
                  />
                </div>
                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Quantity"
                    required
                    type="number"
                    id="quantityIssue"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {quantity > actualQuantity ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginLeft: "2px",
                    }}
                  >
                    Please Select Less than {actualQuantity}
                  </div>
                ) : null}

                <button
                  disabled={quantity > actualQuantity}
                  style={{ marginTop: "30px" }}
                  type="submit"
                >
                  {addProductloading ? (
                    <ClipLoader size={15} color="white" />
                  ) : (
                    "Add Product"
                  )}
                </button>
              </form>
            </div>
          </CModalBody>
        </CModal>
      ) : null}
    </div>
  );
};

export default Purchase;
