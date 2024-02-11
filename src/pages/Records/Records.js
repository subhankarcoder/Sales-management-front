import React, { useEffect, useState } from "react";
import { auth } from "../../config/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import "./Records.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import SpecialInput from "../../components/Dropdown";

const Records = () => {
  const api_endpoint = "https://sales-management-back.onrender.com/";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [data_added, setData_added] = useState([]);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setShowAddStatus(true);
    navigate("/update", { state: record }); // Log the selectedRecord after it has been updated
  };
  useEffect(() => {
    console.log("UseEffect Spinned Up");
  }, [selectedRecord]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);

        axios
          .get(`${api_endpoint}details/get-sp-id/${user.email}`)
          .then((response) => {
            setSp_id(response.data.sp_id);

            // Now that you have sp_id, make the second API call
            axios
              .get(`${api_endpoint}status/sales-status/${response.data.sp_id}`)
              .then((res) => {
                setData_added(res.data.data);
              })
              .catch((error) => {
                console.error("Error fetching sales status:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching sp_id:", error);
          });
      } else {
        console.log("Error");
      }
    });
  }, []);
  const showAll = () => {
    setSelectedFilter(null)
  }
  const filteredData = selectedFilter
    ? data_added.filter((record) => record.visit_status === selectedFilter)
    : data_added;

  return (
    <div className="record">
      <Navbar />
      <div className="choose-filter">
        <p>Choose Filter: </p>
        <SpecialInput selected={selectedFilter} setSelected={setSelectedFilter}/>
        <button onClick={showAll} className="show-all">Show All</button>
      </div>
      <div className="card-holder">
        {filteredData.map((record, index) => (
          <div key={index} className="card">
            <div className="edit" onClick={() => handleEditClick(record)}>
              +
            </div>
            <div className="det">
              <p className="head">Buyer Name:</p>
              <p className="data">
                {record.seller_name ? record.seller_name : "NA"}
              </p>
            </div>
            <div className="det">
              <p className="head">Buyer Address:</p>
              <p className="data">{record.address ? record.address : "NA"}</p>
            </div>
            <div className="det">
              <p className="head">Visit Status:</p>
              <p className="data">
                {record.visit_status ? record.visit_status : "NA"}
              </p>
            </div>
            <div className="det">
              <p className="head">Order Placement Date:</p>
              <p className="data">
                {record.order_placement_date
                  ? record.order_placement_date
                  : "NA"}
              </p>
            </div>
            <div className="det">
              <p className="head">Order Value:</p>
              <p className="data">
                {record.order_value ? record.order_value : "NA"}
              </p>
            </div>
            <div className="det">
              <p className="head">Order Quantity:</p>
              <p className="data">
                {record.order_quantity ? record.order_quantity : "NA"}
              </p>
            </div>
            <div className="det">
              <p className="head">Product Name:</p>
              <p className="data">
                {record.product_name ? record.product_name : "NA"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;
