
import React, { useState, useEffect } from 'react'
import { fetchWeather } from './utils/api'
import randomColor from 'randomcolor'
import WeekWeather from './components/WeekWeather'

import './css/style.styl'

const App = () => {
  const [city, setCity] = useState('Bucharest')
  const [country, setCountry] = useState('')
  const [search, setSearch] = useState('Bucharest')
  const [weather, setWeather] = useState([])
  const [color, setColor] = useState('')

  const getWeather = (searchedCity) => {
    fetchWeather(searchedCity)
    .then(res => {
      const weatherData = res.list.map(weatherOfDay => weatherOfDay)
      setWeather(weatherData)
      setCity(searchedCity)
      setCountry(res.city.country)
      setColor(randomColor({luminosity: "dark", format: "hex"}))
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchedCity = event.target.value;

    if (searchedCity === city) {
      return;
    }
    setSearch(searchedCity)
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter your city</legend>
          <input className="form-input" ref="locationName" type="text" defaultValue={search}/>
        </fieldset>
      </form>
    );
  }

  useEffect(getWeather, [search])

  return (
    <div className="weather-container" style={{backgroundColor: color}}>
      {weather.length === 0 ? "no data" : <WeekWeather color={color} weather={weather} city={city} country={country}/>}
      {renderForm()}
      <blockquote className="blockquote blockquote-centered">
        <p>
          Created by
          <a href="http://twitter.com/mironcatalin"> @mironcatalin</a>
        </p>
      </blockquote>
    </div>
  )
}

export default App