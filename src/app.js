import React from "react"
import { fetchWeather } from "./api"
import { getIcon } from "./getIcon"
import randomColor from "randomcolor"
import fetch from "whatwg-fetch"
import _ from "lodash"

import WeatherItem from "./WeatherItem"

import "./css/style.styl";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      city: "Bucuresti",
      searchedCity: "Bucuresti",
      randomColor: "",
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

  shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  _renderWeek() {
    return <div className="week-container">
      <div className="week-current-day">
        {!_.isEmpty(this.state.weekWeather) ? this._renderCurrentDay() : null}
      </div>
      <div className="week-all-days">
        {_.map(this.state.weekWeather, (weather, i) => {
          var style = {
            backgroundColor: this.shadeColor2(this.state.randomColor, -(i + 1) / 20)
          }
          return <div className="week-one-day" style={style}>
            <WeatherItem key={i} theme={"small"} weather={weather} />
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
      <form onSubmit={this.handleSubmit.bind(this)}>
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
