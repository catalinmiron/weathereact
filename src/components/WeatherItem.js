import React from "react"
import Skycons from "react-skycons"
import Moment from "moment"
import NumberEasing from "react-number-easing"
import getIcon from "../utils/getIcon"

const WeatherItem = ({ theme, data, city, country }) => {
  
  const timestamp = data.dayWeather.dt
  const temperature = data.dayWeather.temp.max
  const weatherType = data.dayWeather.weather[0].description
  const icon = data.dayWeather.weather[0].id

  const renderDayName = () => {
    const days = {
      sameDay: "[Today]",
      nextDay: "ddd",
      nextWeek: "ddd",
      lastDay: "ddd",
      lastWeek: "ddd"
    }

    return <p className="timestamp">
      {Moment(timestamp * 1000).calendar(null, days)}
    </p>
  }

  return (
   <div className={"weather-item " + theme}>
      <p className="location">
        <span className="city">{city}</span>
        <span className="country">{country ? `, ${country}` : null}</span>
      </p>
      <Skycons color="white" icon={getIcon(icon)} />
      {renderDayName()}
      <div className="temperature-info">
        <p className="temperature">
          <NumberEasing value={Math.round(temperature)} speed={1200} ease='circInOut'/> °C
        </p>
        <p className="info">{weatherType}</p>
      </div>
    </div>
  )
}

export default WeatherItem 