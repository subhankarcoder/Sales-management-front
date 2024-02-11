import React, { useState } from "react";
import "./Filter.css";
import SpecialInput from "../Dropdown";

const Filter = ({ setSelectedFilter }) => {
  const [selected, setSelected] = useState("");

    setSelected(setSelectedFilter)
  return (
    <div>
      <SpecialInput selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default Filter;
