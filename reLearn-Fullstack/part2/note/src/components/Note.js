import React from "react";
const Note = ({ note }) => {
  //接收一个note对象
  return <li>{note.content}</li>;
};

export default Note;
