import React, { useEffect, useState } from "react";

const SECONDS_TO_WAIT = 1000;

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => onSearch(value), SECONDS_TO_WAIT);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className="form-input">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={'Type "/" to search'} />
    </div>
  );
}
