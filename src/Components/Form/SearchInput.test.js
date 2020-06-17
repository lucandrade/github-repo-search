import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

import SearchInput from "./SearchInput";

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

it("Renders the input", () => {
  const onSearch = jest.fn();

  act(() => {
    render(<SearchInput onSearch={onSearch} />, container);
  });

  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: 'the-value' }});

  act(() => {
    jest.advanceTimersByTime(100);
  });

  expect(onSearch).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(onSearch).toHaveBeenCalledWith('the-value');
});
