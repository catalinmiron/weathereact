import React from "react";
import WeatherItem from "./WeatherItem";
// import shadeColor from "../utils/shadeColor";

const WeekWeather = ({color, weather, city, country}) => {
  
    return (
      <div className="week-container">
        <div className="week-current-day">
          <WeatherItem data={weather[0]} />
        </div>
        <div className="week-all-days">
          {weather.map((weatherOfDay, i) => {
            // const style = {
            //   backgroundColor: shadeColor(color, -(i + 1) / 20)
            // }
            return (
              <div key={i} className="week-one-day">
                <WeatherItem theme={"small"} data={weatherOfDay} city={city} country={country}/>
              </div>
            )
          })}
        </div>
    </div>
    ) 
}

export default WeekWeather
