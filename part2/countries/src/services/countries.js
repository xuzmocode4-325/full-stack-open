import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

// gets all countries from the baseUrl api
// creates a new list with added index to each country object
const getAll = async () => {
    try {
        const request = axios.get(baseUrl)
        const response = await request
        const countries = response
        return countries
    }
    catch {
        console.error();
    }

}


export default {getAll};