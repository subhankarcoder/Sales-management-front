import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./UpdateStatus.css"
import SpecialInput from "../Dropdown";
import { auth } from "../../config/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const UpdateStatus = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const api_endpoint = "https://sales-management-back.onrender.com/";
  const [selected, setSelected] = useState(state.visit_status);
  const [email, setEmail] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [orderValue, setOrderValue] = useState("");
  const[visitStatus, setVisitStatus] = useState(state.visit_status);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [productName, setProductName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [objectId, setObjectId] = useState(state._id)
  const [formData, setFormData] = useState({
    added_by: "",
    product_name: "",
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

  const handleEditClick = async () => {
    try {
      const updatedData = {
        ...state,
        object_id: objectId,
        added_by: sp_id,
        product_name: productName ? productName : state.product_name,
        seller_name: buyerName ? buyerName : state.seller_name,
        address: address ? address : state.address,
        visit_date: visitDate ? visitDate : state.visit_date,
        visit_status: formData.visit_status,
        order_value: orderValue ? orderValue : state.order_value,
        order_quantity: orderQuantity ? orderQuantity : state.order_quantity,
        order_placement_date: deliveryDate ? deliveryDate : state.order_placement_date,
      };

      const response = await axios.put(
        `${api_endpoint}status/sales-status/${objectId}`,
        updatedData
      );

      console.log(response.data);
      navigate("/record")
    console.log(updatedData)

    } catch (error) {
      console.error("Error updating sales status:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);

        axios
          .get(`${api_endpoint}details/get-sp-id/${user.email}`)
          .then((response) => {
            console.log(response.data);
            setSp_id(response.data.sp_id);
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
                type="text"
                placeholder="Enter Product name"
                defaultValue={state.product_name}
                onChange={(e) => setProductName(e.target.value)}
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

          <button onClick={handleEditClick}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
