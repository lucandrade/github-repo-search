import React from "react";

export default function Form() {
  const onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-input search">
        <label htmlFor="search">Search</label>
        <input type="text" id="search" placeholder={'Type "/" to search'} />
      </div>
    </form>
  );
}
