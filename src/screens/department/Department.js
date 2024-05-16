import React, { useState, useEffect } from "react";
import "./style.css";
import departmentDataa from "./data";
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
const InventoryTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [addDepartmentLoading, setAddDepartmentLoading] = useState(false);
  const [issueProductLoading, setIssueProductLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [name, setName] = useState("");
  const [componentLoading, setComponentLoading] = useState(false);

  const [departmentName, setDepartmentName] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  useEffect(() => {
    getDepartmentData();
    getProductData();
  }, []);

  const getDepartmentData = async () => {
    setComponentLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get/department`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDepartmentData(res?.data);
        setComponentLoading(false);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setComponentLoading(false);
      });
  };

  const getProductData = async () => {
    setComponentLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get/product`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProductData(res?.data);
        setComponentLoading(false);
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setComponentLoading(false);
      });
  };

  const openModal = () => {
    setShowModal(true);
    setShowIssueModal(false);
  };

  const openIssueModal = () => {
    setShowIssueModal(true);
    setShowModal(false);
  };

  const handleCloseAddDepartmentModal = () => {
    setShowModal(false);
    setName("");
  };

  const handleCloseIssueModal = () => {
    setShowIssueModal(false);
    setDepartmentName("");
    setProductName("");
    setProductQuantity("");
  };

  const handleSelectDepartment = (e) => {
    setDepartmentName(e);
  };

  const handleSelectProduct = (e) => {
    setProductName(e);
  };

  const handleSelectQuantity = (e) => {
    setProductQuantity(e);
  };
  const handelIssueProductSubmit = async (e) => {
    setIssueProductLoading(true);
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/update`,
        {
          name: departmentName,
          id: productName,
          productquantity: parseInt(productQuantity, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        NotificationManager.success("Product Issued");
        setShowIssueModal(false);
        setIssueProductLoading(false);
        getDepartmentData();
        getProductData();
        setDepartmentName("");
        setProductName("");
        setProductQuantity("");
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setIssueProductLoading(false);
      });
  };
  const handelAddDepartmentSubmit = async (e) => {
    setAddDepartmentLoading(true);
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/create/department`,
        {
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        NotificationManager.success("Department Added");
        setShowModal(false);
        setAddDepartmentLoading(false);
        getDepartmentData();
        getProductData();
        setName("");
      })
      .catch((err) => {
        NotificationManager.error(`${err?.response?.data?.message}`);
        setAddDepartmentLoading(false);
      });
  };
  const itemsPerPage = 10;

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = departmentData?.filter((item) =>
    item.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ margin: "10px" }}>
      <div className="search-add-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by Department Name"
          value={searchTerm}
          onChange={handleChangeSearch}
        />
        <div>
          <button
            style={{ width: "130px" }}
            onClick={openIssueModal}
            className="add-item-button"
          >
            Issue Product
          </button>
          <button
            style={{ width: "130px" }}
            onClick={openModal}
            className="add-item-button"
          >
            Add Department
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Total Issued Products</th>
            <th>Price</th>
            <th>Issued Products</th>
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
  {currentItems?.map((item) => {
    // Calculate total cost for the current item
    const totalCost = item.productsAssigned.reduce((acc, product) => acc + product.product.price * product.quantity, 0);

    return (
      <tr key={item.id}>
        <td>{item.departmentName}</td>
        <td>{item.totalIssuedProducts}</td>
        <td>{totalCost}</td> {/* Display the calculated total cost */}
        <td>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {item.productsAssigned?.map((product) => (
                <tr key={product.id}>
                  <td>{product.product.ProductName}</td>
                  <td>{product.product.ProductType}</td>
                  <td>{product.quantity}</td>
                  <td>{product.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    );
  })}
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
                  onClick={handleCloseAddDepartmentModal}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 100,
                    cursor: "pointer",
                  }}
                />
              </div>
              <h3 style={{ textAlign: "center" }}>Add Department</h3>
              <form
                className="signup-form"
                onSubmit={handelAddDepartmentSubmit}
              >
                <div>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Department Name"
                    required
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <button style={{ marginTop: "30px" }} type="submit">
                  {addDepartmentLoading ? (
                    <ClipLoader size={15} color="white" />
                  ) : (
                    "Add Department"
                  )}
                </button>
              </form>
            </div>
          </CModalBody>
        </CModal>
      ) : null}
      {showIssueModal ? (
        <CModal
          show={showIssueModal}
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
                  onClick={handleCloseIssueModal}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 100,
                    cursor: "pointer",
                  }}
                />
              </div>
              <h3 style={{ textAlign: "center" }}>
                Issue Products To Department
              </h3>
              <form className="signup-form" onSubmit={handelIssueProductSubmit}>
                <div style={{ marginTop: "15px", marginRight: "8px" }}>
                  <CSelect
                    style={{
                      cursor: "pointer",
                      height: "35px",
                      borderRadius: "5px",
                      paddingRight: "10px",
                      width: "100%",
                      border: "1px solid grey",
                      paddingLeft: "5px",
                      color: "black",
                    }}
                    value={departmentName}
                    name="departmentName"
                    onChange={(e) => handleSelectDepartment(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departmentData?.map((department) => (
                      <option value={department.departmentName}>
                        {department.departmentName}
                      </option>
                    ))}
                  </CSelect>
                </div>
                <div style={{ marginTop: "15px", marginRight: "8px" }}>
                  <CSelect
                    style={{
                      cursor: "pointer",
                      height: "35px",
                      borderRadius: "5px",
                      paddingRight: "10px",
                      width: "100%",
                      border: "1px solid grey",
                      paddingLeft: "5px",
                      color: "black",
                    }}
                    value={productName}
                    name="productName"
                    onChange={(e) => handleSelectProduct(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {productData?.map((department) => (
                      <option value={department._id}>
                        {department.ProductName}
                      </option>
                    ))}
                  </CSelect>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <input
                    style={{ width: "95%", borderRadius: "5px" }}
                    placeholder="Enter Quantiy"
                    required
                    type="number"
                    id="quantity"
                    value={productQuantity}
                    onChange={(e) => handleSelectQuantity(e.target.value)}
                  />
                </div>

                <button style={{ marginTop: "30px" }} type="submit">
                  {issueProductLoading ? (
                    <ClipLoader size={15} color="white" />
                  ) : (
                    "Issue Product"
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

export default InventoryTable;
