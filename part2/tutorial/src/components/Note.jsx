const Note = ({ note, toggleImportance }) => {
  const label = note.important
  ? 'make unimportant' : 'make important'

  return (
      <li className="note">
        <p>{note.content}</p>
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
}
export default Note; 