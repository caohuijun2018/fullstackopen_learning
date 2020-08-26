import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import ReTogglable from "./RecombinationTogglable";
import Blog from "./Blog";
import BlogToView from "./blogToView";
import { prettyDOM } from '@testing-library/dom'
describe("<ReTogglable/>", () => {
  test("check the url and the likes", () => {
    const blog = {
      title: "Doubt is the key to knowledge.",
      author: "huijun",
      url: "http://haha.com",
      likes: "30",
    };
    let compoent = render(<Blog blog={blog}></Blog>);
    expect(compoent.container).toHaveTextContent(
      "Doubt is the key to knowledge."
    );

    compoent = render(
      <ReTogglable buttonLabel="view">
        <div className="testDiv" />
      </ReTogglable>
    );
    const button = compoent.getByText("view");
    fireEvent.click(button);

    const div = compoent.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  // test("Clicking the button is normal ", () => {
  //   // const blog = {
  //   //   title: "Doubt is the key to knowledge.",
  //   //   author: "huijun",
  //   //   url: "http://haha.com",
  //   //   likes: "30",
  //   // };
  //   // let component = render(<Blog blog={blog}></Blog>);
  //   // expect(component.container).toHaveTextContent(
  //   //   "Doubt is the key to knowledge."
  //   // );
  //   const mockHandler = jest.fn();
  //   const component = render(
     
        
  //       <BlogToView buttonLabel="likes">
  //         <div className="likesContent" />
         
  //         <button onClick={mockHandler} />
  //       </BlogToView>
      
  //   );
  //   component.debug();
  //   const buttonTwo = component.getByText("likes");
  //   fireEvent.click(buttonTwo);
  //   expect(mockHandler.mock.calls).toHaveLength(1);
  // });
});
