import { useState, useEffect } from 'react'
import countryServices from './services/countries'

const Form = (props) => {
  //console.log(props)
  const {text, onSubmit, handleSearch, value} = props
  return (
    <>
      <form name="country-search" onSubmit={onSubmit}>
        <input name="search"
          value={value}
          type="text"
          onChange={handleSearch}/>
          <button type="submit">
            {text}
        </button>
      </form>
    </>
  )
}

const Country = (props) => {
  console.log(props)
  const {names} = props
  return (
    <div>
      {names.common}
    </div>
  )
}

const Display = (props) => {
  //console.log(props) 
  const filter = props.input
  console.log(filter.length)
  if (filter.length === 0 || filter.length > 10) {
    return (
      <>
        <p>{filter.length} potential matches</p>
      </>
    )
  } else if (filter.length === 1) {
    
    return (
      <>
      </>
    )
  } else {
    return(
      <>
        <h3>Matches</h3>
          {filter.map(country => 
            <Country
              key={country.id} 
              names={country} 
        />)}
      </>
    )
    
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [newNotification, setNotification] = useState({
    content: null, 
    type:null
  })
  
  const hookAll = () => {
    countryServices
    .getAll()
    .then(allCountries => {
      console.log('promise fulfilled')
      console.log(allCountries)
      setCountries(allCountries)
    })
  }

  useEffect(hookAll, [])

  const hookOne =() => {
    console.log('effect run, country is now', country)

    // skip if currency is not defined
    if (country) {
      console.log('fetching country data...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setCountry(response.data.name.common)
        })
    }
  }

  useEffect(hookOne,[country])

  const handleSearchInput = (event) => {
    //console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const onSearchClick = (event) => {
    event.preventDefault()
    setCountry(newSearch)
  }

  const nameFilter = (country, search) => {
    const {common, official} = country
    return (common.includes(search) || official.includes(search))
  }

  const CountriesToShow = (newSearch.length > 0) 
  ? countries.filter(c => nameFilter(c, newSearch))
  : countries

  return (
    <>
      <Form 
        text="search"
        onSubmit={onSearchClick}
        handleSearch={handleSearchInput}
        value={newSearch}
      />
      <Display
        input={CountriesToShow}
      />
    </>
  )
}

export default App
