import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

import Pagination from "./Pagination";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders with less than 9 pages", () => {
  const onChange = jest.fn();
  const pages = 5;
  const page = 1;

  act(() => {
    render(
      <Pagination
        onChange={onChange} pages={pages} current={page} />,
      container
    );
  });

  const list = container.querySelector('.pagination');

  expect(list.querySelectorAll('li').length).toBe(pages);

  let item;

  for (let a = 1; a <= pages; a += 1) {
    item = list.querySelector(`li:nth-child(${a})`);
    fireEvent.click(item);

    if (a === page) {
      expect(onChange).not.toHaveBeenCalled();
    } else {
      expect(onChange).toHaveBeenCalledWith(a);
    }
  }
});

it("Renders 9 links when pages are higher than 9", () => {
  const onChange = jest.fn();
  const pages = 20;
  const page = 6;

  act(() => {
    render(
      <Pagination
        onChange={onChange} pages={pages} current={page} />,
      container
    );
  });

  const list = container.querySelector('.pagination');

  expect(list.querySelectorAll('li').length).toBe(9);
});

it("Sets the first and last page when current page above the minimum", () => {
  const onChange = jest.fn();
  const pages = 20;
  const page = 6;

  act(() => {
    render(
      <Pagination
        onChange={onChange} pages={pages} current={page} />,
      container
    );
  });

  const list = container.querySelector('.pagination');
  const firstItem = list.querySelector('li');

  expect(firstItem.innerHTML).toBe('1...');

  const lastItem = list.querySelector('li:nth-child(9)');

  expect(lastItem.innerHTML).toBe('...20');
});

it("Does not set the first page when current page is bellow the minimum", () => {
  const onChange = jest.fn();
  const pages = 20;
  const page = 5;

  act(() => {
    render(
      <Pagination
        onChange={onChange} pages={pages} current={page} />,
      container
    );
  });

  const list = container.querySelector('.pagination');
  const firstItem = list.querySelector('li');

  expect(firstItem.innerHTML).toBe('1');
});

it("Sets the first and last page when current page is bellow the maximum", () => {
  const onChange = jest.fn();
  const pages = 20;
  const page = 15;

  act(() => {
    render(
      <Pagination
        onChange={onChange} pages={pages} current={page} />,
      container
    );
  });

  const list = container.querySelector('.pagination');
  const lastItem = list.querySelector('li:nth-child(9)');

  expect(lastItem.innerHTML).toBe(`...${pages}`);
});

it("Does not set the last page when current page is above the maximum", () => {
  const onChange = jest.fn();
  const pages = 20;
  const page = 16;

  act(() => {
    render(
      <Pagination
        onChange={onChange}
        pages={pages}
        current={page} />,
      container
    );
  });

  const list = container.querySelector('.pagination');
  const lastItem = list.querySelector('li:nth-child(9)');

  expect(lastItem.innerHTML).toBe(`${pages}`);
});
