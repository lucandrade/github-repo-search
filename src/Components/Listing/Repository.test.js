import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Repository from "./Repository";

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

it("Renders the repository component", () => {
  const props = {
    description: "some-description",
    name: "some-name",
    url: "http://some-url.com",
    avatarUrl: "http://some-avatar-url.com",
  };

  act(() => {
    render(
      <Repository {...props} />,
      container
    );
  });
  
  const renderedAvatarUrl = container.querySelector('img').getAttribute('src');
  const renderedRepoUrl = container.querySelector('a').getAttribute('href');
  const renderedRepoName = container.querySelector('a').innerHTML;
  const renderedRepoDescription = container.querySelector('p').innerHTML;

  expect(renderedAvatarUrl).toBe(props.avatarUrl);
  expect(renderedRepoUrl).toBe(props.url);
  expect(renderedRepoName).toBe(props.name);
  expect(renderedRepoDescription).toBe(props.description);
});
