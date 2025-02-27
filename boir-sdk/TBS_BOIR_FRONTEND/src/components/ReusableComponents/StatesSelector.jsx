// CountrySelector.js
import React from "react";
import states from "../../utils/statesData";

const StatesSelector = ({ value, onChange }) => {
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
      {states.map((states) => (
        <option key={states.code} value={states.code}>
          {states.name}
        </option>
      ))}
    </select>
  );
};

export default StatesSelector;
