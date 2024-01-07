import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import Display from './components/Display'
import Notification from './components/Notification'
import Form from './components/Form'

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [newNotification, setNotification] = useState({
    content: null, 
    type:null
  })
  
  // grabs all countries 
  const hookAll = () => {
    countryServices
    .getAll()
    .then(countries => {
      console.log('loading countries...')
      //console.log(countries.data)
      const data = countries.data.map((c, index) => {
        const nameObject = {id:index+1, ...c} 
        return nameObject
      })
      //console.log(data)
      setCountries(data)
    })
    .catch(error => {
      console.log(error)
      const errorObject = {
        content: `Unable to retrieve country data for. 
        Check your connection and try again`,
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
  }
  useEffect(hookAll, [])  

  // updates state of the app according to the search value upon input change
  const handleSearchInput = (event) => {
    //console.log(event.target.value)
    setNewSearch(event.target.value)
   
  }

  // prevents page reloading on search button click
  // sets the country to the value of the search state
  const onSearchClick = (event) => {
    event.preventDefault()
    const result =  newSearch.toLowerCase() 
    setCountry(result)
  }

  // filters list of countries by search input
  // compares input to lowercase common and official names

  const nameFilter = (result, search) => {
    const {name} = result
    return (
      name.common.toLowerCase().includes(search) || 
      name.official.toLowerCase().includes(search))
  }
  
  // ternery applying nameFilter function
  const countriesFilter = (newSearch.length > 0) 
  ? countries.filter(c => nameFilter(c, newSearch))
  : countries
    
  if (countriesFilter.length === 1) {
    
    console.log(countriesFilter[0].name)
    //const result = countriesFilter[0].common.toLowerCase()
    //setCountry(result)  
  } 

  return (
    <>
      <h1>Search A Country</h1>
      <Notification message={newNotification}/>
      <Form 
        text="search"
        onSubmit={onSearchClick}
        handleSearch={handleSearchInput}
        value={newSearch}
      />
      <Display
        list={countriesFilter}
      />
    </>
  )
}

export default App
