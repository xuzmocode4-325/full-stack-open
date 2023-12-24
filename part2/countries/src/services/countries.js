import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = async () => {
    try {
        const request = axios.get(baseUrl)
        const response = await request
        const names = response.data.map((c, index) => {
            const nameObject = {id:index+1, ...c.name} 
            return nameObject   
        })
        return names
    }
    catch {
        console.error();
    }
}

export default {getAll};