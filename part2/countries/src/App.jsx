import { useState, useEffect } from 'react'
import weatherServices from './services/weather'
import countryServices from './services/countries'
import Display from './components/Display'
import Form from './components/Form'

function App() {
  const [appState, setAppState] = useState({
    countries: [],
    newSearch: '',
    country: null,
    capital: null,
    currentWeather: null,
    cityLocation: {
      latitude: 0,
      longitude: 0,
    },
    newNotification: {
      content: null,
      type: null,
    },
  });
  
  const handleApiError = (error, message) => {
    console.log(error);
    const errorObject = {
      content: message,
      type: 0,
    };
    setAppState((prevState) => ({ ...prevState, newNotification: errorObject }));
    setTimeout(() => {
      setAppState((prevState) => ({ ...prevState, newNotification: { content: null, type: null } }));
    }, 15000);
  };

  const getLocation = async () => {
    if (appState.country) {
      try {
        const data = await weatherServices.fetchGeoData(appState.capital);
        const result = data[0];
        const { lat, lon } = result;
        const location = {
          latitude: lat.toFixed(2),
          longitude: lon.toFixed(2),
        };
        setAppState((prevState) => ({ ...prevState, cityLocation: location }));
      } catch (error) {
        handleApiError(error, 'Error getting coordinates. Check your connection and try again');
      }
    }
  };

  const getWeather = async () => {
    if (appState.cityLocation) {
      try {
        const result = await weatherServices.fetchWeather(appState.cityLocation);
        setAppState((prevState) => ({ ...prevState, currentWeather: result }));
        //console.log(appState.currentWeather)
      } catch (error) {
        handleApiError(error, 'Error getting weather data. Check your connection and try again');
      }
    }
  };

  useEffect(() => {
    getLocation();
  }, [appState.newSearch, appState.country]);

  useEffect(() => {
    getWeather();
  }, [appState.cityLocation]);

  // grabs all countries 
  const hookAll = () => {
      countryServices
    .getAll()
    .then((countries) => {
      console.log('loading countries...');
      const data = countries.data.map((c, index) => ({
        id: index + 1,
        ...c,
      }));
      setAppState((prevState) => ({ ...prevState, countries: data }));
    })
    .catch(error => {
      console.log(error)
      const errorObject = {
        content: `Unable to retrieve country data for at the moment.`,
        type: 0
      }
      setAppState((prevState) => ({
        ...prevState,
        newNotification: errorObject
      }))
      setTimeout(() => {
        setAppState((prevState) => ({ 
          ...prevState, 
          newNotification: { content: null, type: null } }));
      }, 15000);
  
    })
  }
  useEffect(hookAll, [])  
 
  // updates state of the app according to the search value upon input change
  const handleSearchInput = (event) => {
    setAppState((prevState) => ({
      ...prevState,
      country: null,
      capital: null,
      cityLocation: null,
      currentWeather: null,
      newSearch: event.target.value,
    }));
  };
  // prevents page reloading on search button click
  // sets the country to the value of the search state
  const onSearchClick = (event) => {
    event.preventDefault()
    setAppState(prevState => ({...prevState, newSearch: event.target.value}))
  }

  const onCountryClick = (name, capCity) => {
    console.log("clicked for", name)
    if (!appState.country) {
      const newCountry = name.toLowerCase()
      try {
        const newCapital = capCity[0]
        setAppState((prevState) => ({
          ...prevState, 
          country: newCountry,
          capital: newCapital}))
      } 
      catch {
        const errorObject = {
        content: `Unable to retrieve country data at the moment.`,
        type: 1
        }
        setAppState((prevState) => ({
          ...prevState,
          newNotification: errorObject
        }))
        setTimeout(() => {
          setAppState((prevState) => ({ 
            ...prevState, 
            newNotification: { content: null, type: null } }));
        }, 15000);
      }
    }
    console.log(
      "country:", appState.country, 
      "capital:", appState.capital
    )
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
    const filterInput = appState.country
    ? appState.country
    : appState.newSearch.toLowerCase()
    //console.log(filterInput)
    const countriesFilter = (filterInput.length > 0) 
    ? appState.countries.filter(c => nameFilter(c, filterInput))
    : appState.countries

    return countriesFilter
  }
  
  const filteredList = makeSelection()
  //console.log(filteredList)

 
  return (
    <div className='main'>
      {//appState.newNotification.content && (
        <Form
          text="search"
          onSubmit={onSearchClick}
          handleSearch={handleSearchInput}
          value={appState.newSearch}
          message={appState.newNotification}
        />
      //)
      } 
      <Display 
        countries={appState.countries} 
        list={filteredList} 
        weather={appState.currentWeather}
        onClick={onCountryClick} />
    </div>
  );
}

export default App
