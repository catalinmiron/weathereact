import React from "react"
import { fetchWeather } from "./lib/api"
import { getIcon } from "./lib/getIcon"
import { shadeColor } from "./lib/shade-color"
import randomColor from "randomcolor"
import fetch from "whatwg-fetch"
import _ from "lodash"

import WeatherItem from "./components/WeatherItem"

import "./css/style.styl";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      city: "Bucharest",
      searchedCity: "Bucharest",
      weekWeather: []
    };
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather() {
    fetchWeather(this.state.searchedCity)
      .then((response) => {
        var weather = _.map(response.list, (dayWeather) => {
          return {
            country: response.city.country,
            city: response.city.name,
            timestamp: dayWeather.dt,
            temperature: dayWeather.temp.max,
            weatherType: dayWeather.weather[0].description,
            weatherDescription: dayWeather.weather[0].main,
            icon: getIcon(dayWeather.weather[0].id)
          }
        })

        this.setState({
          weekWeather: weather,
          city: this.state.searchedCity,
          randomColor: randomColor({luminosity: "dark", format: "hex"})
        });
      })
  }

  render() {
    let style = {
      backgroundColor: this.state.randomColor
    }

    return <div className="weather-container" style={style}>
      {this._renderWeek()}
      {this._renderForm()}
      <blockquote className="blockquote blockquote-centered">
        <p>
          Created by
          <a href="http://twitter.com/mironcatalin"> @mironcatalin</a>
        </p>
      </blockquote>
    </div>;
  }

  _renderWeek() {
    return <div className="week-container">
      <div className="week-current-day">
        {!_.isEmpty(this.state.weekWeather) ? this._renderCurrentDay() : null}
      </div>
      <div className="week-all-days">
        {_.map(this.state.weekWeather, (weather, i) => {
          var style = {
            backgroundColor: shadeColor(this.state.randomColor, -(i + 1) / 20)
          }
          return <div key={i} className="week-one-day" style={style}>
            <WeatherItem theme={"small"} weather={weather} />
          </div>
        })}
      </div>
    </div>;
  }

  _renderCurrentDay() {
    return <WeatherItem weather={this.state.weekWeather[0]} />
  }

  _renderForm() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>Enter your city</legend>
          <input className="form-input"
                 type="text"
                 onChange={this.onChange.bind(this)}
                 value={this.state.searchedCity}/>
        </fieldset>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.searchedCity === this.state.city) {
      return;
    }

    this.getWeather();
  }

  onChange(e) {
    this.setState({
      searchedCity: e.target.value
    });
  }
};


React.render(<App />, document.body);
