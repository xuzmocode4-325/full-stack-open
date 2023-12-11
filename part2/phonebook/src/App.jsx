import { useState } from 'react'
import Search from './components/Search'
import Display from './components/Contact'
import Form from './components/Field'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
      

  const addContact = (event) => {
    event.preventDefault()
    console.log(persons)
    const contactObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1
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
      setNewNumber('')
    }
  }

  const personsToShow = (newSearch.length > 0) 
  ? persons.filter(person => 
    person.name.toLowerCase().includes(newSearch.toLowerCase()))
  : persons
  

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search 
          value={newSearch}
          onChange={handleSearchInput}
      />
      <Form 
        newName={newName}
        newNumber={newNumber}
        onSubmit={addContact}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
       />
      <Display persons={personsToShow}/>
    </div> 
  )
}

export default App
