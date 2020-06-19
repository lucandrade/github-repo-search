import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

import Select from './Select';

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
  const onSelect = jest.fn();

  act(() => {
    render(
      (
        <Select
          id="my-select"
          label="Label"
          disabled={true}
          options={[]}
          onSelect={onSelect} />
      ),
      container
    );
  });

  const select = container.querySelector('#my-select');

  expect(select.disabled).toBe(true);
});

it("Renders the select", () => {
  const onSelect = jest.fn();

  act(() => {
    render(
      (
        <Select
          id="my-select"
          label="Label"
          options={[{ value: 'some-value', label: 'Some Label' }]}
          onSelect={onSelect} />
      ),
      container
    );
  });

  const select = container.querySelector('#my-select');

  expect(select.disabled).toBe(false);

  fireEvent.change(select, { target: { value: 'some-value' }});

  expect(onSelect).toHaveBeenCalledWith('some-value');
});
