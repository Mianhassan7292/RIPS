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
const Sellers = () => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

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
      .get(`${process.env.REACT_APP_BASE_URL}/get/all/seller`, {
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

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/signup`,
        {
          email: email,
          password: password,
          loginType: "seller",
          phone: phone,
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        NotificationManager.success("Seller Created");
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
    item.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
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
          placeholder="Search by Sellers Name"
          value={searchTerm}
          onChange={handleChangeSearch}
        />
        <button onClick={openModal} className="add-item-button">
          Create Seller
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone #</th>
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
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
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
              <h3 style={{ textAlign: "center" }}>Create Seller</h3>
              <form className="signup-form" onSubmit={handelAddProductSubmit}>
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
                <button style={{ marginTop: "30px" }} type="submit">
                  {addProductloading ? (
                    <ClipLoader size={15} color="white" />
                  ) : (
                    "Create Seller"
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

export default Sellers;
