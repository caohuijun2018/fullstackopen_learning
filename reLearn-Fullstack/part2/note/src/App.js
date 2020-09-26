import React, { useState, useEffect } from "react";
import Note from "./components/Note";


import noteService from './services/note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(' ')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage,setErrormessage] = useState('')
  useEffect(() => {
    noteService
      .getAll()
      .then(intilaNote => {
        console.log('effect')
        setNotes(intilaNote)
      })
  }, []) //第二个参数为空数组，说明该组件只在第一次渲染的时候执行

  const NotificationError = ({message}) => {
    if(message === null){
      return null
    }
    return (
      <div className = 'error'>
        {message}
      </div>
    )
  }
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnNote => {
        setNotes(notes.concat(returnNote))
        setNewNote('')
      })

  }
  const noteToShow = showAll ? notes : notes.filter(note => note.important === true)
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportantOf = id => {
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changeNote = { ...note, important: !note.important }
    noteService
      .update(id,changeNote)
      .then(returnNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnNote))
      })
      .catch(error => {
        setErrormessage(`the note of ${note.content} has alreadly deleted`)
        setTimeout(() => {
          setErrormessage(null)
        },5000)
        setNotes(notes.filter(note => note.id !== id )) 
      })
    console.log(`the impostant of ${id} will be changed`)
  }
  return (
    <div>
      <NotificationError  message = {errorMessage}/>
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
