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

it("Call the onSearch when the input is changed", async () => {
  const onSearch = jest.fn();

  act(() => {
    render(<Form onSearch={onSearch} />, container);
  });

  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: 'the-value' }});

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });

  expect(onSearch).toHaveBeenCalledWith({
    query: 'the-value',
    sort: '',
    order: 'desc',
  });
});

it("Call the onSearch when the sort is changed", async () => {
  const onSearch = jest.fn();

  act(() => {
    render(<Form onSearch={onSearch} />, container);
  });

  const sortSelect = container.querySelector('#sort');

  await act(async () => {
    fireEvent.change(sortSelect, { target: { value: 'stars' } });
  });

  expect(onSearch).toHaveBeenCalledWith({
    query: '',
    sort: 'stars',
    order: 'desc',
  });
});

it("Call the onSearch when the order is changed", async () => {
  const onSearch = jest.fn();

  act(() => {
    render(<Form onSearch={onSearch} />, container);
  });

  const orderSelect = container.querySelector('#order');

  await act(async () => {
    fireEvent.change(orderSelect, { target: { value: 'asc' } });
  });

  expect(onSearch).toHaveBeenCalledWith({
    query: '',
    sort: '',
    order: 'asc',
  });
});
