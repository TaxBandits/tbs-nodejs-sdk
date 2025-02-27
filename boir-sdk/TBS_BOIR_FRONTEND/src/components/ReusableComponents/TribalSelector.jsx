// CountrySelector.js
import React from "react";
import tribes from "../../utils/tribesData";

// Convert object to an array of { code, description }
const tribesArray = Object.keys(tribes).map((key) => ({
  code: key, 
  description: tribes[key],
}));
const TribalSelector = ({ value, onChange }) => {
  return (
    <select
      className="form-control form-select"
      id="selectCountryJurisdiction"
      value={value}
      onChange={onChange}
    >
      <option disabled value="">
        --- Select ---
      </option>
      {tribesArray.map((tribes) => (
        <option key={tribes.code} value={tribes.code}>
          {tribes.description}
        </option>
      ))}
    </select>
  );
};

export default TribalSelector;
