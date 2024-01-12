import { useState, useEffect } from 'react'
import weatherServices from './services/weather'
import countryServices from './services/countries'
import Display from './components/Display'
import Notification from './components/Notification'
import Form from './components/Form'

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [capital, setCapital] = useState(null)
  const [weather, setWeather] = useState([])
  const [newNotification, setNotification] = useState({
    content: null, 
    type:null
  })
  
  // grabs all countries 
  const hookAll = () => {
    if (!countries){
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
  }
  useEffect(hookAll, [])  

  const hookWeatherData = () => {
    if (capital)
    weatherServices
    .fetchGeoData(capital)
    .then(data => console.log(data))
  }

  useEffect(hookWeatherData, [])

  // updates state of the app according to the search value upon input change
  const handleSearchInput = (event) => {
    //console.log(event.target.value)
    setCountry(null)
    setCapital(null)
    setNewSearch(event.target.value)
   
  }

  // prevents page reloading on search button click
  // sets the country to the value of the search state
  const onSearchClick = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)
  }

  const onCountryClick = (name, code, capital) => {
    if (!country) {
      const countryQuery = name.toLowerCase()
      const capitalQuery = capital
      console.log("clicked for", name)
      setCountry(countryQuery)
      setCapital(capitalQuery)
    }
    
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
  const makeSelection = () => {
    const filterInput = country
    ? country
    : newSearch.toLowerCase()
    //console.log(filterInput)
    const countriesFilter = (filterInput.length > 0) 
    ? countries.filter(c => nameFilter(c, filterInput))
    : countries

    return countriesFilter
  }
  
  const filteredList = makeSelection()
  //console.log(filteredList)

  return (
    <div className='main'>
      <Notification message={newNotification}/>
      <Form 
        text="search"
        onSubmit={onSearchClick}
        handleSearch={handleSearchInput}
        value={newSearch}
      />
      <Display
        countries={countries}
        list={filteredList}
        onClick={onCountryClick}
      />
     
    </div>
  )
}

export default App
