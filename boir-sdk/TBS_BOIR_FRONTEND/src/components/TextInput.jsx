import React from 'react';

const TextInput = ({ label, id, required, placeholder, value, onChange }) => (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">
            {required && <span className="text-danger">*</span>}
            {label}
        </label>
        <input
            type="text"
            className="form-control"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextInput;
