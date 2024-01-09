import axios from 'axios'

const APIKey = process.env.OPEN_WEATHER_API
const geoDataUrl = "http://api.openweathermap.org/geo/1.0/direct?"
const weatherDataUrl = "https://api.openweathermap.org/data/3.0/onecall?"

const fetchGeoData = async (cityName) => {
    const limit = 3
    const geoDataEndpoint = `q=${cityName}&limit=${limit}&appid=${APIKey}` 
    const request = axios.get(
        geoDataUrl+geoDataEndpoint
    ) 
    const response = await request
    const data = await response.json();
    console.log(data);
    return data
}

const fetchData = async (coordinates) => {
    const {lat, lon} = coordinates
    const part = "minutely,hourly,daily,alerts"
    const weatherDataEndpoint = `lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIKey}`
    const request = axios.get(
      weatherDataUrl + weatherDataEndpoint
    );
    const response = await request
    const data = await response.json();
    console.log(data);
    return data 
  };

  export default {fetchData, fetchGeoData}
