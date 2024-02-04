import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo"></div>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Records</a>
        </li>
        <li>
          <a href="#">Add</a>
        </li>
        <li>
          <a href="#">Log Out</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
