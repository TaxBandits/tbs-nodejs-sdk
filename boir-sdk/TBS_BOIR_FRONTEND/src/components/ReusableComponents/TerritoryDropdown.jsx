import React from "react";

const TerritoryDropdown = ({ selectedTerritory, onTerritoryChange }) => {
  const territories = [
    { code: "AS", name: "American Samoa" },
    { code: "GU", name: "Guam" },
    { code: "MH", name: "Marshall Islands" },
    { code: "FM", name: "Micronesia, Federated States" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "PW", name: "Palau" },
    { code: "PR", name: "Puerto Rico" },
    { code: "VI", name: "U.S. Virgin Islands" },
  ];

  return (
    <div className="mb-12px mt-2">
      <label htmlFor="selectUSTerritoryCountry" className="control-label">
        U.S. territory of registration:
      </label>
      <select
        className="form-control form-select"
        id="selectUSTerritoryCountry"
        value={selectedTerritory}
        onChange={onTerritoryChange}
      >
        <option selected disabled value="">
          ---Select---
        </option>
        {territories.map((territory) => (
          <option key={territory.code} value={territory.code}>
            {territory.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TerritoryDropdown;
