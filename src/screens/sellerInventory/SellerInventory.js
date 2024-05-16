import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import {
  CModal,
  CModalBody,
  CButton,
  CModalHeader,
  CSelect,
} from "@coreui/react";
const SellerInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [addProductloading, setAddProductloading] = useState(false);
  const [componentLoading, setComponentLoading] = useState(false);

  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validateTypeselect, setValidateTypeselect] = useState(false);
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

  const handleProductType = (e) => {
    setProductType(e);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const handleCloseAddProductModal = () => {
    setShowModal(false);
    setName("");
    setProductType("");
    setQuantity("");
    setPrice("");
  };

  const handelAddProductSubmit = async (e) => {
    setAddProductloading(true);
    e.preventDefault();
    if (productType === "") {
      setValidateTypeselect(true);
      setAddProductloading(false);
      return;
    }
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/create/seller/product`,
        {
          productName: name,
          productType: productType,
          price: price,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        NotificationManager.success("Product added");
        setShowModal(false);
        setAddProductloading(false);
        getInventoryData();
        setName("");
        setProductType("");
        setQuantity("");
        setPrice("");
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setAddProductloading(false);
      });
  };
  const itemsPerPage = 10;

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
        <input
          className="search-input"
          type="text"
          placeholder="Search by Product Name"
          value={searchTerm}
          onChange={handleChangeSearch}
        />
        <button onClick={openModal} className="add-item-button">
          Add Product
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Cost</th>
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
                <td>{item.totalCost}</td>
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
              <h3 style={{ textAlign: "center" }}>Add Product For Sell</h3>
              <form className="signup-form" onSubmit={handelAddProductSubmit}>
                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Product Name"
                    required
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "15px", marginRight: "8px" }}>
                  <CSelect
                    className={"child-box-2-select"}
                    style={{
                      cursor: "pointer",
                      height: "35px",
                      borderRadius: "5px",
                      paddingRight: "10px",
                      width: "100%",
                      border: "1px solid grey",
                      paddingLeft: "5px",
                    }}
                    value={productType}
                    name="productTypes"
                    onChange={(e) => handleProductType(e.target.value)}
                  >
                    <option value="" disabled>
                      Product Type
                    </option>
                    <option value={"Books"}>Books</option>
                    <option value={"Office Supplies"}>Office Supplies</option>
                    <option value={"Electronics"}>Electronics</option>
                    <option value={"Laboratory Equipment"}>
                      Laboratory Equipment
                    </option>
                    <option value={"Furniture"}>Furniture</option>
                    <option value={"Stationery"}>Stationery</option>
                    <option value={"Classroom Tools"}>Classroom Tools</option>
                    <option value={"Sports Equipment"}>Sports Equipment</option>
                    <option value={"Medical Supplies"}>Medical Supplies</option>
                    <option value={"Maintenance Tools"}>
                      Maintenance Tools
                    </option>
                    <option value={"Safety Equipment"}>Safety Equipment</option>
                    <option value={"Cleaning Supplies"}>
                      Cleaning Supplies
                    </option>
                  </CSelect>
                </div>

                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Price"
                    required
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    minLength={6}
                    maxLength={20}
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Quantity"
                    required
                    type="number"
                    id="quantityIssue"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {productType === "" && validateTypeselect ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "15px",
                      marginLeft: "2px",
                    }}
                  >
                    Please select Product type *
                  </div>
                ) : null}

                <button style={{ marginTop: "30px" }} type="submit">
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

export default SellerInventory;
