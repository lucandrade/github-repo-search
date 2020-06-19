import React, { useEffect, useRef, useState } from "react";

const SECONDS_TO_WAIT = 1000;

function SearchInput({ query, disabled, onSearch }, ref) {
  const [value, setValue] = useState(query);
  const fakeRef = useRef(true);

  useEffect(() => {
    const onKeyDown = (e) => {
      // Focus the input when "/" key is pressed
      if (e.keyCode === 191 && ref.current) {
        ref.current.focus();
        e.preventDefault();
      }
    };

    document.body.addEventListener('keydown', onKeyDown);

    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [ref]);

  useEffect(() => {
    // Do not run when it's mounted
    if (fakeRef.current) {
      fakeRef.current = false;
    } else {
      // Runs the search after 1 second the input is changed
      const timeoutId = setTimeout(
        () => onSearch(value),
        SECONDS_TO_WAIT
      );
      return () => clearTimeout(timeoutId);
    }
  }, [value, onSearch]);

  return (
    <div className="form-input search">
      <label htmlFor="search" disabled={disabled}>Search</label>
      <input
        ref={ref}
        disabled={disabled}
        type="text"
        id="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={'Type "/"'} />
    </div>
  );
}

export default React.forwardRef(SearchInput);
