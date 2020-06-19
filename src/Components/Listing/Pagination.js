import React from "react";

const NUMBER_OF_ITEMS = 9;
const ITEMS_EACH_SIDE = 4;

export default function Pagination({ pages, current, onChange }) {
  if (pages < 1) {
    return null;
  }

  const items = [];
  let start;
  let end;
  let appendToEnd = false;

  if (pages < NUMBER_OF_ITEMS) {
    start = 1;
    end = pages;
  } else if (current - ITEMS_EACH_SIDE < 1) {
    start = 1;
    end = start + NUMBER_OF_ITEMS - 1;
  } else if (current + ITEMS_EACH_SIDE > pages) {
    start = pages - NUMBER_OF_ITEMS;
    end = pages;
  } else {
    start = current - ITEMS_EACH_SIDE;
    end = start + NUMBER_OF_ITEMS - 1;
  }

  if (current - ITEMS_EACH_SIDE > 1) {
    items.push(
      <li
        key={1}
        onClick={() => onChange(1)}
        className={`${current === 1 ? 'active' : ''}`}>
        {`1...`}
      </li>
    );
    start++;
  }

  if (current + ITEMS_EACH_SIDE < pages) {
    appendToEnd = true;
    end--;
  }

  for (let a = start; a <= end; a += 1) {
    items.push(
      <li
        key={a}
        onClick={() => onChange(a)}
        className={`${current === a ? 'active' : ''}`}>
        {a}
      </li>
    );
  }

  if (appendToEnd) {
    items.push(
      <li
        key={pages}
        onClick={() => onChange(pages)}
        className={`${current === pages ? 'active' : ''}`}>
        ...{pages}
      </li>
    );
  }

  return (
    <ul className="pagination">{items}</ul>
  );
}