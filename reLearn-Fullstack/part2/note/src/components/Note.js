import React from "react";
const Note = ({ note  ,toggleImportant}) => {
  //接收一个note对象

  const lable = note.important ? 'make not important' : 'make important'
  return(
  <li>{note.content}
  <button onClick = {toggleImportant}>{lable}</button>
  </li>
  )
};

export default Note;
