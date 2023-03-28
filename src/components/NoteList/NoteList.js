import './NoteList.css'

import Note from "../Note/Note"

const NoteList = ({notes, toggleImportanceOf}) => {
  return (
    <ul className='note-list'>
      {notes.map(note => 
        <Note
          key={note.id}
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}
        />
      )}
    </ul>
  )
}
  

export default NoteList