import React, { useEffect, useState } from "react";
import "./Home.css";
import { auth } from "../../config/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import AddSales from "../../components/add-sales/AddSales";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const api_endpoint = "https://sales-management-back.onrender.com/";
  const [email, setEmail] = useState("");
  const [sp_id, setSp_id] = useState("");
  const [data_added, setData_added] = useState([]);
  const navigate = useNavigate();
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
  const AddStatus = ()=> {
    navigate("/add")
  }
  return (
    <div className="home">
      <Navbar />
      <div className="user-list">
        <table className="table-content">
          <thead>
            <tr>
              <th>Seller Name</th>
              <th>Visit Status</th>
              <th>Visit Date</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data_added.length === 0 ? (
              <td>No data added till now!</td>
            ) : (
              data_added.map((item, index) => (
                <tr className="user-list-data" key={index}>
                  <td>{item.seller_name}</td>
                  <td>{item.visit_status}</td>
                  <td>{item.visit_date}</td>
                  <td>{item.address}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div onClick={AddStatus}>
        <AddSales />
      </div>
    </div>
  );
};

export default Home;
