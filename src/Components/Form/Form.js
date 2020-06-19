import React, { createRef, useEffect, useRef, useState } from "react";

import SearchInput from "./SearchInput";
import Select from "./Select";
import { ORDER_OPTIONS, SORT_OPTIONS } from "../../Constants";

export default function Form({ onSearch }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const [order, setOrder] = useState(ORDER_OPTIONS[0].value);
  const [searching, setSearching] = useState(false);
  const fakeRef = useRef(true);
  const searchRef = createRef();

  useEffect(() => {
    if (searching) {
      const runSearch = async () => {
        await onSearch({ query, sort, order });
        setSearching(false);
      };

      runSearch();
    }
  }, [searching]);

  useEffect(() => {
    // Do not run when it's mounted
    if (fakeRef.current) {
      fakeRef.current = false;
    } else {
      setSearching(true);
    }
  }, [fakeRef, query, sort, order, onSearch]);

  const onSubmit = e => {
    e.preventDefault();
    setQuery(searchRef.current.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <SearchInput
        ref={searchRef}
        disabled={searching}
        query={query}
        onSearch={setQuery} />
      <Select
        id="sort"
        label="Sort"
        disabled={searching}
        options={SORT_OPTIONS}
        onSelect={setSort} />
      <Select
        id="order"
        label="Order"
        disabled={searching}
        options={ORDER_OPTIONS}
        onSelect={setOrder} />
    </form>
  );
}
