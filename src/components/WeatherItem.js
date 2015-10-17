import React from "react"
import Skycons from "react-skycons"
import Moment from "moment"
import NumberEasing from "react-number-easing"


export default class WeatherItem extends React.Component {
  displayName: "WeatherItem"

  render() {
    let weather = this.props.weather;

    return <div className={"weather-item " + this.props.theme}>
      <p className="location">
        <span className="city">{weather.city}</span>
        <span className="country">{weather.country ? `, ${weather.country}` : null}</span>
      </p>
      <Skycons color="white" icon={weather.icon} />
      {this._renderDayName()}
      <div className="temperature-info">
        <p className="temperature">
          <NumberEasing value={Math.round(weather.temperature)}
                        speed={1200}
                        ease='circInOut'/>
          °C
        </p>
        <p className="info">{weather.weatherType}</p>
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
      {Moment(this.props.weather.timestamp * 1000).calendar(null, days)}
    </p>
  }
}
