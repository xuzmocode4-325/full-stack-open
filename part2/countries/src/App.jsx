import { useState, useEffect } from 'react'
import weatherServices from './services/weather'
import countryServices from './services/countries'
import Display from './components/Display'
import Form from './components/Form'

function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [capital, setCapital] = useState(null)
  const [cityLocation, setCityLocation] = useState({
    latitude:null,
    longitude:null,
  })
  const [currentWeather, setCurrentWeather] = useState([])
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

  const getLocation = () => {
      console.log("getting cordinates...")
      weatherServices
      .fetchGeoData(capital)
      .then(data => data[0])
      .then(result => {
       console.log(result)
       const {lat, lon} = result
        const location = {
          latitude: lat.toFixed(2), 
          longitude: lon.toFixed(2)} 
        console.log(location)
        setCityLocation(location)
      })
      .catch(error => console.log(error))
  }

  const getWeather = () => {
    console.log("getting weather...")
    weatherServices
    .fetchWeather(cityLocation)
    .then(data => {
        console(data)
        const {main, weather, wind} = data
        setCurrentWeather(data)
      })
      .catch(error => {
        console.log(error)
        const errorObject = {
          content: `Unable to retrieve weather data. 
          Please check your connection and try again`,
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
 
  // updates state of the app according to the search value upon input change
  const handleSearchInput = (event) => {
    //console.log(event.target.value)
    setCountry(null)
    setCapital(null)
    setCityLocation(null)
    setCurrentWeather(null)
    setNewSearch(event.target.value)
   
  }

  // prevents page reloading on search button click
  // sets the country to the value of the search state
  const onSearchClick = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)
  }

  const onCountryClick = (name, capCity) => {
    if (!country) {
      console.log("clicked for", name)
      setCountry(name.toLowerCase())
      setCapital(capCity)
      console.log("name: ", country, "capital: ", capital)
      getLocation()
      if (!currentWeather) {
        getWeather()
      } 
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
      <Form 
        text="search"
        onSubmit={onSearchClick}
        handleSearch={handleSearchInput}
        value={newSearch}
        message={newNotification}
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
