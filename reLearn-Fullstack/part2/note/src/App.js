import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import './App.css'
import axios from 'axios'
const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(' ')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('effect')
        setNotes(response.data)
      })
  }, []) //第二个参数为空数组，说明该组件只在第一次渲染的时候执行

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })

  }
  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportantOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changeNote = { ...note, important: !note.important }
    axios
      .put(url, changeNote).then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
    console.log(`the impostant of ${id} will be changed`)
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportant={() => toggleImportantOf(note.id)} />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>

    </div>
  );
};
export default App;
