import React from "react";

export default function Select({ id, label, options, onSelect }) {
  return (
    <div className="form-input">
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={e => onSelect(e.target.value)}>
        {options.map(({ value, label }) => (
          <option key={`${value}-${label}`} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
