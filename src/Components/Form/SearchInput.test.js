import React, { createRef } from "react";
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

it("Disables the input when disabled is true", () => {
  const onSearch = jest.fn();
  const ref = createRef();

  act(() => {
    render(
      <SearchInput
        disabled={true}
        ref={ref}
        query={""}
        onSearch={onSearch} />,
      container
    );
  });

  const input = container.querySelector('input');
  expect(input.disabled).toBe(true);
});

it("Renders the input", () => {
  const onSearch = jest.fn();
  const ref = createRef();

  act(() => {
    render(<SearchInput ref={ref} query={""} onSearch={onSearch} />, container);
  });

  expect(document.hasFocus()).toBe(false);

  const input = container.querySelector('input');

  expect(input.disabled).toBe(false);

  fireEvent.keyDown(container, { keyCode: 191 });

  expect(document.hasFocus()).toBe(true);

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
