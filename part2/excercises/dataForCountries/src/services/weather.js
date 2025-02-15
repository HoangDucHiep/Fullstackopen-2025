import axios from "axios"

const api_key = import.meta.env.VITE_APIKEY

const baseUrl = (lat, lon) => `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
const iconUrl = (id) => `https://openweathermap.org/img/wn/${id}@2x.png`

const getWeather = (lat, lon) => {
    console.log(`${lat} ${lon}`)
    console.log(api_key)
    return axios.get(baseUrl(lat, lon))
        .then(res => res.data);
}

export default {
    getWeather,
}