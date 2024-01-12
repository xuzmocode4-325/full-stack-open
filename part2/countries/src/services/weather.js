import axios from 'axios'


const APIKey = import.meta.env.VITE_REACT_APP_OPEN_WEATHER_API;
const geoDataUrl = "http://api.openweathermap.org/geo/1.0/direct?"
const weatherDataUrl = "https://api.openweathermap.org/data/2.5/weather?"

const fetchGeoData = async (capCity) => {
    const limit = 10
    const geoDataEndpoint = `q=${capCity}&limit=${limit}&appid=${APIKey}` 
    const request = axios.get(
        geoDataUrl+geoDataEndpoint
    ) 
    const response = await request
    const data = response.data
    //console.log(data)
    return data
}

const fetchWeather = async (coordinates) => {
    const {latitude, longitude} = coordinates
    const weatherDataEndpoint = `lat=${latitude}&lon=${longitude}&appid=${APIKey}`
    const request = axios.get(
      weatherDataUrl + weatherDataEndpoint
    );
    const response = await request
    const data = await response.data;
    console.log(data);
    return data 
  };

  export default {fetchWeather, fetchGeoData}
