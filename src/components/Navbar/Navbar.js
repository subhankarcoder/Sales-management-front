import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../config/Firebase-config";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <div className="navbar">
        <div className="logo"></div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/record">Records</Link>
        </li>
        <li>
          <Link to="/add">Add</Link>
        </li>
        <li>
          <Link to="#" onClick={handleLogout}>Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
