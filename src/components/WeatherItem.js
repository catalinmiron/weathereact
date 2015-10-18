import React from "react"
import Skycons from "react-skycons"
import Moment from "moment"
import NumberEasing from "react-number-easing"
import { getIcon } from "./../utils/getIcon"


export default class WeatherItem extends React.Component {
  displayName: "WeatherItem"

  render() {
    let weather = this.props.data,
        country = weather.country,
        city = weather.city,
        timestamp = weather.dayWeather.dt,
        temperature = weather.dayWeather.temp.max,
        weatherType = weather.dayWeather.weather[0].description,
        weatherDescription = weather.dayWeather.weather[0].main,
        icon = weather.dayWeather.weather[0].id;

    return <div className={"weather-item " + this.props.theme}>
      <p className="location">
        <span className="city">{city}</span>
        <span className="country">{country ? `, ${country}` : null}</span>
      </p>
      <Skycons color="white" icon={getIcon(icon)} />
      {this._renderDayName()}
      <div className="temperature-info">
        <p className="temperature">
          <NumberEasing value={Math.round(temperature)}
                        speed={1200}
                        ease='circInOut'/>
          °C
        </p>
        <p className="info">{weatherType}</p>
      </div>
    </div>
  }

  _renderDayName() {
    let days = {
      sameDay: "[Today]",
      nextDay: "ddd",
      nextWeek: "ddd",
      lastDay: "ddd",
      lastWeek: "ddd"
    }

    return <p className="timestamp">
      {Moment(this.props.data.dayWeather.dt * 1000).calendar(null, days)}
    </p>
  }
}
