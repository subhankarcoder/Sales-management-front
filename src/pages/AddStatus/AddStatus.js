import React, { useState, useEffect } from "react";
import "./AddStatus.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/Firebase-config";
import SpecialInput from "../../components/Dropdown";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const AddStatus = () => {
  const api_endpoint = "http://localhost:8000/";
  const [selected, setSelected] = useState("");
  const [email, setEmail] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [formData, setFormData] = useState({
    added_by: "",
    seller_name: "",
    address: "",
    visit_date: "",
    visit_status: "",
    order_value: "",
    order_quantity: "",
    order_placement_date: "",
  });

  const handleSelectChange = (value) => {
    setSelected(value);
    setFormData({ ...formData, visit_status: value }); // Update visit_status in formData
  };

  const handleSubmit = async () => {
    const updatedFormData = {
      added_by: sp_id,
      seller_name: buyerName,
      address: address,
      visit_date: visitDate,
      visit_status: formData.visit_status, // Include visit_status in updatedFormData
      order_value: orderValue,
      order_quantity: orderQuantity,
      order_placement_date: deliveryDate,
    };

    setFormData(updatedFormData);

    console.log(updatedFormData);

    try {
      const response = await axios.post(
        `${api_endpoint}status/sales-status-upload`,
        updatedFormData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
            setFormData({ ...formData, added_by: response.data.sp_id });
          })
          .catch((error) => {
            console.error("Error fetching sp_id:", error);
          });
      } else {
        console.log("Error");
      }
    });

    // Ensure to return the cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <div className="status">
      <Navbar />
      <div className="add-form">
        <input
          type="text"
          placeholder="Add Buyer's Name..."
          onChange={(e) => setBuyerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add Buyer's Address..."
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          className="date"
          placeholder="Enter visit date"
          onChange={(e) => setVisitDate(e.target.value)}
        />
        <SpecialInput
          selected={formData.visit_status}
          setSelected={handleSelectChange}
        />

        {selected === "Order Placed" && (
          <>
            <input
              type="text"
              placeholder="Enter Order Value (e.g., 10000)..."
              onChange={(e) => setOrderValue(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Order Quantity (e.g., 20)"
              onChange={(e) => setOrderQuantity(e.target.value)}
            />
            <input
              type="date"
              className="date"
              placeholder="Enter Delivery date"
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </>
        )}

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddStatus;
