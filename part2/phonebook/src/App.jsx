import { useState } from 'react'

const Contact = ({person}) => {
  return (
    <div>
      {person.name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    console.log(persons)
    const contactObject = {
      name: newName,
    }

    const isDuplicate = persons.map((person) => person.name).includes(newName)
    console.log(newName, isDuplicate?  'is a duplicate' : 'is fresh')

    if (isDuplicate) {
      console.log(contactObject, 'exists')
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = persons.concat(contactObject)
      setPersons(newPersons)
      setNewName('')
    }

  
  
  }

  


      
  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addContact}> 
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <Contact key={person.name} person={person}
        />)}
    </div>
    
  )
}

export default App
