import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async(url) => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '589e221f36msh04dbb2a1e9f401cp180488jsn9c3c882a142e',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })
    return data
}