import React from "react";
import WeatherItem from "./WeatherItem";
import { shadeColor } from "./../utils/shade-color";

import _ from "lodash";

export default class WeekWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const color = this.props.color;

    return <div className="week-container">
      <div className="week-current-day">
        <WeatherItem data={this.props.weekWeather[0]} />
      </div>
      <div className="week-all-days">
        {_.map(this.props.weekWeather, (weather, i) => {
          var style = {
            backgroundColor: shadeColor(color, -(i + 1) / 20)
          }
          return <div key={i} className="week-one-day">
            <WeatherItem theme={"small"} data={weather} />
          </div>
        })}
      </div>
    </div>
  }
}
