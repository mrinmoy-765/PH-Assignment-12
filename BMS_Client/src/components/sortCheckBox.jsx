import React, { useState } from "react";

const SortCheckBox = ({ onCheckBoxClick }) => {
  const [selected, setSelected] = useState("all");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onCheckBoxClick(value);
  };

  return (
    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-auto border p-4 mt-3">
      <legend className="fieldset-legend text-base text-[#5C5470] work-sans">
        Availability
      </legend>

      <label className="label work-sans">
        <input
          type="radio"
          name="availability"
          value="all"
          checked={selected === "all"}
          onChange={handleChange}
          className="radio"
        />
        All
      </label>

      <label className="label work-sans">
        <input
          type="radio"
          name="availability"
          value="available"
          checked={selected === "available"}
          onChange={handleChange}
          className="radio"
        />
        Available
      </label>

      <label className="label work-sans">
        <input
          type="radio"
          name="availability"
          value="rented"
          checked={selected === "rented"}
          onChange={handleChange}
          className="radio"
        />
        Rented Out
      </label>
    </fieldset>
  );
};

export default SortCheckBox;
