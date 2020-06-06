
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

  const [address, setAddress] = useState({})
  const [coords, setCoords] = useState({})

  const shortCoord = (coord) => {
    return coord.substr(0, coord.indexOf('.') + 7)
  }

  const showPosition = (position) => {
    const latlng = {}
    latlng['latitude'] = shortCoord(position.coords.latitude.toString())
    latlng['longitude'] = shortCoord(position.coords.longitude.toString())
    // console.log(latlng)
    setCoords(latlng)
  }
  
  const getCoords = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  const getAddress = () => {
    if(Object.keys(coords).length !== 0) {
      const API_URL = `${process.env.REACT_APP_ADD_URL}q=${coords.latitude}+${coords.longitude}&key=${process.env.REACT_APP_ADD_KEY}`

      fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const addr = {}
        if(data.results[0].components.city !== undefined)
          addr['city'] = data.results[0].components.city
        else {
          addr['village'] = data.results[0].components.village
        }
        addr['countryCode'] = data.results[0].components['ISO_3166-1_alpha-2']
        addr['country'] = data.results[0].components.country
        // console.log(addr)
        setAddress(addr)
      })
      .catch(err => console.log(err))
    }
  }

  useEffect(getCoords, [])
  useEffect(getAddress, [coords])

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