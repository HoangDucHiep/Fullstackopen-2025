import { useState, useEffect } from 'react'
import './App.css'

import SearchForm from "./components/SearchForm";
import SearchResult from './components/SearchResult';
import Country from "./components/Country";

import countriesService from "./services/countries";
import weatherService from "./services/weather";
import Weather from './components/Weather';


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [matchedCountries, setMatchedCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // useEffect 
  useEffect(() => {
    countriesService
      .getAll()
      .then(data => {
        setCountries(data);
      })
  }, [])

  // handle state functions
  const handleSearchQuery = e => {
    let searchQur = e.target.value
    setSearchQuery(searchQur)

    if (searchQur === "") {
      setMatchedCountries([]);
      return
    }

    searchQur = searchQur.toLowerCase()
    console.log(searchQur)

    const matched = countries.filter(c => {
      return c.name.common.toLowerCase().includes(searchQur)
        || c.name.official.toLowerCase().includes(searchQur)/* 
        || Object.values(c.name.nativeName)[0].common.toLowerCase().includes(searchQur)
        || Object.values(c.name.nativeName)[0].official.toLowerCase().includes(searchQur) */
    })
    setMatchedCountries(matched);
    if (matched.length === 1) {
      setCountryToShow(matched[0])
      weatherService.getWeather(matched[0].latlng[0], matched[0].latlng[1])
      .then(data => {
        setWeatherData(data)
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
    }
    console.log(matched)
  }

  const showCountry = country => {
    console.log(country)
    setCountryToShow(country)
    weatherService.getWeather(country.latlng[0], country.latlng[1])
      .then(data => {
        setWeatherData(data)
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }

  return (
    <>
      <SearchForm label={"find countries"} value={searchQuery} handleInput={handleSearchQuery}></SearchForm>
      <SearchResult results={matchedCountries} handleShowCountry={showCountry}></SearchResult>
      {countryToShow !== null ? (
        <>
          <Country country={countryToShow}></Country>
          {weatherData && <Weather place={countryToShow.name.common} data={weatherData}></Weather>}
        </>
      ) : null}
    </>
  )
}

export default App