import React, { useState, useEffect } from "react";
import "./style.css";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const InventoryTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [componentLoading, setComponentLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    getInventoryData();
  }, []);

  const getInventoryData = async () => {
    setComponentLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get/product`, {
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
    <div style={{ margin: "10px" }}>
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
            <th>Price</th>
            <th>Availability in Stock</th>
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
                <td>{item.price}</td>
                <td>{item.availableInStock}</td>
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
  );
};

export default InventoryTable;
