import React, { useEffect, useRef, useState } from "react";
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

export default function Form({ onSearch }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const [order, setOrder] = useState(ORDER_OPTIONS[0].value);
  const fakeRef = useRef(true);

  useEffect(() => {
    // Do not run when it's mounted
    if (fakeRef.current) {
      fakeRef.current = false;
    } else {
      onSearch({ query, sort, order });
    }
  }, [fakeRef, query, sort, order, onSearch]);

  const onSubmit = e => {
    e.preventDefault();
    onSearch({ query, sort, order });
  };

  return (
    <form onSubmit={onSubmit}>
      <SearchInput onSearch={setQuery} />
      <Select
        id="sort"
        label="Sort"
        options={SORT_OPTIONS}
        onSelect={setSort} />
      <Select
        id="order"
        label="Order"
        options={ORDER_OPTIONS}
        onSelect={setOrder} />
    </form>
  );
}
