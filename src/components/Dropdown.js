import React, { useState } from "react";
import { TextField, Menu, MenuItem } from "@mui/material";
import DownWardArrow from "../assests/images/downward-arrow.png"
import './Dropdown.css'

const SpecialInput = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["No Response", "Moderate Response", "Order Placed", "Order Delivered"];
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        <div className="selection">{selected ? selected : "Choose one"}</div>
        <div className="down-btn"><img src={DownWardArrow} /></div>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option, key) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              key={key}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialInput;
