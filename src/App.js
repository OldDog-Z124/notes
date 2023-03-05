import { useState, useEffect } from 'react'

import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note ...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initiaNotes => {
        setNotes(initiaNotes)
      })
  }, [])

  const notesToShow = showAll 
  ? notes 
  : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      content: newNote,
      important: Math.random()<0.5,
    }

    noteService
      .create(noteObject)
      .then(returnNote => {
        setNotes(notes.concat(returnNote))
        setNewNote('')
      })
  }

  const handleNoteChangee = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changeNote = {...note, important: !note.important}
    
    noteService
      .update(id, changeNote)
      .then(returnNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnNote))
      })
      .catch(error => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChangee} />
        <button type='submit'>save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App