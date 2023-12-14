import { useState, useEffect } from 'react'
import Search from './components/Search'
import Display from './components/Display'
import Form from './components/Form'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newNotification, setNotification] = useState({
    content: null, type:null})

  const hook = () => {
    console.log('effect')
    contactService
    .getAll()
    .then(initialContacts => {
      console.log('promise fulfilled')
      setPersons(initialContacts)
    })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    //console.log(event.target.value)
    setNewSearch(event.target.value)
  }
      
  const addContact = (event) => {
    event.preventDefault()
    console.log(persons)
    const contactObject = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map(p => p.id))+1
    }

    const isDuplicate = persons.map(p => p.name).includes(newName)
    console.log(newName, isDuplicate?  'is a duplicate' : 'is fresh')

    if (isDuplicate) {
      console.log(contactObject, 'exists')
      const message1 = `${newName} is already added to phonebook`
      const message2 = `Would you like to update contact information for ${newName}?`
      alert(message1)
      const result = confirm(message2)

      if (result){
        const contactToUpdate = persons.find(p => p.name === newName)
        console.log(contactToUpdate)
        const updatedContact = {...contactToUpdate, number: newNumber} 
        console.log(updatedContact)
        const id = updatedContact.id
        contactService
        .update(id, updatedContact)
        .then(returnedContact => {
          setPersons(persons.map(p => p.id !== id? p :returnedContact))
        })
        .catch(error => {
          const errorObject = {
            content: `A listing for ${newName} no longer exists`,
            type: 0
          }
          setNotification(errorObject)
          setTimeout(() => {
            setNotification({
              content: null,
              type: null
            })
          }, 5000)
        })
        const updateNotification = {
          content: `Update to ${newName} contact successful`,
          type: 1
        }
        setNotification(updateNotification)
        setTimeout(() => {
          setNotification({
            content: null,
            type: null
          })
        }, 5000)
      }
    } else {
      contactService
      .newContact(contactObject)
      .then(newContact =>{
        console.log(newContact)
        setPersons(persons.concat(newContact))
      })
      const addNotification = {
        content: `Successfully added ${newName} to contacts`,
        type: 1
      }
      setNotification(addNotification)
      setTimeout(() => {
        setNotification({
          content: null,
          type: null
        })
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    console.log('delete requested')
    const person = persons.find(p => p.id === id)
    const personToDelete = {...person, id: 0}
    const message = `Are you sure you want to delete '${personToDelete.name}'?`
    const result = confirm(message)

    if (result){
      contactService
      .removeContact(id)
      .then(returnedPerson => {
        const deleteNotification = {
          content: `${personToDelete.name} deleted`,
          type: 1
        } 
        setNotification(
          deleteNotification
        )
        setTimeout(() => {
          setNotification({
            content: null,
            type: null
          })
        }, 5000)
        
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        const errorObject = {
          message: `Note '${person.name}' has already been removed`,
          type: 0
        }
        setNotification(errorObject)
        setTimeout(() => {
          setNotification({
            content: null,
            type: null
          })
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }) 
      console.log(`instance of ${id} needs to be deleted`)
    }
  }

  const personsToShow = (newSearch.length > 0) 
  ? persons.filter(p => 
    p.name.toLowerCase().includes(newSearch.toLowerCase()))
  : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification}/>
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
      <Display 
        persons={personsToShow} 
        handleDelete={deleteContact}/>
    </div> 
  )
}

export default App; 
