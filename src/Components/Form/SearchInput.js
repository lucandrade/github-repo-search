import React, { createRef, useEffect, useRef, useState } from "react";

const SECONDS_TO_WAIT = 1000;

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState('');
  const inputRef = createRef();
  const fakeRef = useRef(true);

  useEffect(() => {
    const onKeyDown = (e) => {
      // Focus the input when "/" key is pressed
      if (e.keyCode === 191 && inputRef.current) {
        inputRef.current.focus();
        e.preventDefault();
      }
    };

    document.body.addEventListener('keydown', onKeyDown);

    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [inputRef]);

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
      <label htmlFor="search">Search</label>
      <input
        ref={inputRef}
        type="text"
        id="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={'Type "/"'} />
    </div>
  );
}
