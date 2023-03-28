import './Note.css'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className="note">
      <p className="text">{note.content}</p>
      <button className="button" onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note