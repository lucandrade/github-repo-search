import React from "react";
import SearchInput from "./SearchInput";

export default function Form() {
  const onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-input search">
        <SearchInput onSearch={query => console.log('e', query)} />
      </div>
    </form>
  );
}
