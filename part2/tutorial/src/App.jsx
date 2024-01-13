import Note from './components/Note'
import {useState, useEffect} from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newNote, setNewNote] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const hook = () => {
    console.log('effect')
    noteService
    .getAll()
    .then(initialNotes => {
      console.log('promise fulfilled')
      setNotes(initialNotes)
    })
  }
  useEffect(hook, [])
  //console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      //console.log(response)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
    setNotes(notes.map(n => n.id !== id ? n :returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    }) 
    console.log(`importance of ${id} needs to be toggled`)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <Notification message={errorMessage} />
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
      <Footer />
      <p>Debug: {newNote}</p>

    </div>
  )
}

export default App; 