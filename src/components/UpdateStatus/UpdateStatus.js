import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./UpdateStatus.css"
import SpecialInput from "../Dropdown";

const UpdateStatus = (props) => {
  const location = useLocation();
  const { state } = location;
  const api_endpoint = "http://localhost:8000/";
  const [selected, setSelected] = useState("");
  const [email, setEmail] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const[visitStatus, setVisitStatus] = useState(state.visit_status);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [formData, setFormData] = useState({
    added_by: "",
    seller_name: "",
    address: "",
    visit_date: "",
    visit_status: visitStatus,
    order_value: "",
    order_quantity: "",
    order_placement_date: "",
  });
  const handleSelectChange = (value) => {
    setSelected(value);
    setFormData({ ...formData, visit_status: value }); // Update visit_status in formData
  };
  return (
    <div>
      <div className="status">
        <Navbar />
        {/* <p>{visitStatus}</p> */}
        <div className="add-form">
          <input
            type="text"
            placeholder="Add Buyer's Name..."
            defaultValue={state.seller_name}
            onChange={(e) => setBuyerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add Buyer's Address..."
            defaultValue={state.address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="date"
            className="date"
            placeholder="Enter visit date"
            defaultValue={state.visit_date}
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
                defaultValue={state.order_value}
                onChange={(e) => setOrderValue(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Order Quantity (e.g., 20)"
                defaultValue={state.order_quantity}
                onChange={(e) => setOrderQuantity(e.target.value)}
              />
              <input
                type="date"
                className="date"
                placeholder="Enter Delivery date"
                defaultValue={state.order_placement_date}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </>
          )}

          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
