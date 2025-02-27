// src/components/CustomDatePicker.js
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selectedDate, onDateChange, placeholder = "MM-DD-YYYY", dateFormat = "MM-dd-yyyy", className = "form-control", id }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      className={className}
      id={id}
    />
  );
};

export default CustomDatePicker;
