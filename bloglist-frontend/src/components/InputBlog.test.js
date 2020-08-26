import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("test the function of input ", () => {
  const createBlogTitle = jest.fn();

  const component = render(
  <BlogForm handleChangeTitle={createBlogTitle} />
  );
  component.debug()
  //const input = component.container.querySelector("input");
  const input = component.container.querySelector(".title")
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: {
      value: "It is easy to be wise after the event"
     
    }
  });
  fireEvent.submit(form);

  expect(createBlogTitle.mock.calls).toHaveLength(1);
//   expect(createBlogTitle.mock.calls[0][0].content).toBe(
//     "It is easy to be wise after the event"
//   );
});
