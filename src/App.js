import { useState, useEffect } from 'react'

import './App.css'

import noteService from './services/notes'
import NoteList from './components/NoteList/NoteList'
import Notification from './components/Notification/Notification'
import Footer from './components/Footer/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

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
    <div className='app'>
      <h1 className='title'>Notes</h1>

      <div className='notification-container'>
        <Notification message={errorMessage} />
      </div>

      <button className='show-button' onClick={() => setShowAll(!showAll)}>
        {showAll ? 'important' : 'all'}
      </button>

      <NoteList notes={notesToShow} toggleImportanceOf={toggleImportanceOf} />

      <form className='note-form' onSubmit={addNote}>
        <input 
          className='note-form-input' 
          type="text"
          value={newNote} 
          placeholder="a new note ..."
          required  
          onChange={handleNoteChangee} />
        <button className='note-form-button' type='submit'>save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App