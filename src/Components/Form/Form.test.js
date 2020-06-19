import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

import Form from "./Form";

jest.useFakeTimers();

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

it("Call the onSearch when the input is changed", () => {
  const onSearch = jest.fn();

  act(() => {
    render(<Form onSearch={onSearch} />, container);
  });

  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: 'the-value' }});

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(onSearch).toHaveBeenCalledWith({
    query: 'the-value',
    sort: '',
    order: 'asc',
  });
});

it("Call the onSearch when the sort is changed", () => {
  const onSearch = jest.fn();

  act(() => {
    render(<Form onSearch={onSearch} />, container);
  });

  const sortSelect = container.querySelector('#sort');

  fireEvent.change(sortSelect, { target: { value: 'stars' } });

  expect(onSearch).toHaveBeenCalledWith({
    query: '',
    sort: 'stars',
    order: 'asc',
  });
});

it("Call the onSearch when the order is changed", () => {
  const onSearch = jest.fn();

  act(() => {
    render(<Form onSearch={onSearch} />, container);
  });

  const orderSelect = container.querySelector('#order');

  fireEvent.change(orderSelect, { target: { value: 'desc' } });

  expect(onSearch).toHaveBeenCalledWith({
    query: '',
    sort: '',
    order: 'desc',
  });
});
