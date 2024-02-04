import React, { useEffect, useState } from "react";
import { auth } from "../../config/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import "./Records.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Records = () => {
  const api_endpoint = "http://localhost:8000/";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [data_added, setData_added] = useState([]);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setShowAddStatus(true);
    navigate("/update", { state: record }); // Log the selectedRecord after it has been updated
  };
  useEffect(() => {
    console.log(selectedRecord);
  }, [selectedRecord]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setEmail(user.email);

        axios
          .get(`${api_endpoint}details/get-sp-id/${user.email}`)
          .then((response) => {
            console.log(response.data.sp_id);
            setSp_id(response.data.sp_id);

            // Now that you have sp_id, make the second API call
            axios
              .get(`${api_endpoint}status/sales-status/${response.data.sp_id}`)
              .then((res) => {
                console.log(res.data.data);
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
  return (
    <div className="record">
      <Navbar />
      {data_added.map((record, index) => (
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
              {record.order_placement_date ? record.order_placement_date : "NA"}
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
        </div>
      ))}
    </div>
  );
};

export default Records;
