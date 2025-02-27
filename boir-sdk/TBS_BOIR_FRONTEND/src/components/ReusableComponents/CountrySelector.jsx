// CountrySelector.js
import React from "react";
import countryData from "../../utils/countryData";

const CountrySelector = ({ value, onChange }) => {
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
      {countryData.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
