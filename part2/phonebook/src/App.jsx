import axios from 'axios'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import Display from './components/Display'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

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
