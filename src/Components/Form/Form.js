import React from "react";
import SearchInput from "./SearchInput";
import Select from "./Select";

const SORT_OPTIONS = [
  {
    value: '',
    label: 'Best Match'
  },
  {
    value: 'stars',
    label: 'Stars'
  },
  {
    value: 'forks',
    label: 'Forks'
  },
];

const ORDER_OPTIONS = [
  {
    value: 'asc',
    label: 'Ascending'
  },
  {
    value: 'desc',
    label: 'Descending'
  },
];

export default function Form() {
  const onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={onSubmit}>
      <SearchInput onSearch={query => console.log('e', query)} />
      <Select
        id="sort"
        label="Sort"
        options={SORT_OPTIONS}
        onSelect={option => console.log('option', option)} />
      <Select
        id="order"
        label="Order"
        options={ORDER_OPTIONS}
        onSelect={option => console.log('option', option)} />
    </form>
  );
}
