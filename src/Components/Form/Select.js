import React from "react";

export default function Select({ id, disabled, label, options, onSelect }) {
  return (
    <div className="form-input">
      <label disabled={disabled} htmlFor={id}>{label}</label>
      <select id={id} disabled={disabled} onChange={e => onSelect(e.target.value)}>
        {options.map(({ value, label }) => (
          <option key={`${value}-${label}`} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
