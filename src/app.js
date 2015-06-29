import React from "react"
import Skycons from "react-skycons"
import { fetchWeather } from "./api";
import { getIcon } from "./getIcon";

import "./css/style.styl";


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      city: "Bucuresti",
      country: "",
      units: "metric",
      temperature: 0,
      weatherType: "Loading...",
      weatherDescription: "Loading...",
      icon: null
    };
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather() {
    fetchWeather(this.state.city, this.state.units)
      .then((response) => {
        var weatherList = response.list[0];

        this.setState({
          country: weatherList.sys.country,
          city: weatherList.name,
          temperature: weatherList.main.temp,
          weatherType: weatherList.weather[0].description,
          weatherDescription: weatherList.weather[0].main,
          icon: getIcon(weatherList.weather[0].id),
        });
      })
  }

  render() {
    return <div className="weather-body">
      <Skycons color="white" icon={this.state.icon} />
      <h1 className="temperature">
        {parseInt(this.state.temperature, 10)}
      </h1>
      <h5>
        {this.state.city}{this.state.country ? `, ${this.state.country}` : null}
      </h5>
      <h3 className="description">{this.state.weatherType}</h3>
      {this._renderForm()}
    </div>;
  }

  _renderForm() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <legend>Enter your city</legend>
          <input className="form-input"
                 type="text"
                 onChange={this.onChange.bind(this)} value={this.state.city}/>
        </fieldset>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.getWeather();
  }

  onChange(e) {
    this.setState({
      city: e.target.value
    });
  }
};


React.render(<App />, document.body);
