import React from "react"
import Skycons from "react-skycons"

import "./css/style.styl";

let App = React.createClass({
  statics: {
    API_URL: "http://api.openweathermap.org/data/2.5/find?q="
  },
  getInitialState() {
    return {
      city: "Bucuresti",
      country: "",
      units: "metric",
      temperature: 0,
      weatherType: "Loading...",
      weatherDescription: "Loading...",
      icon: null
    }
  },

  getWeather() {
    console.log(this.constructor.API_URL + this.state.city + "&units=" + this.state.units);
    fetch(this.constructor.API_URL + this.state.city + "&units=" + this.state.units)
      .then(function(result) {return result.json()})
      .then(function(response) {
        console.log(response);
        var weatherList = response.list[0];

        this.setState({
          country: weatherList.sys.country,
          city: weatherList.name,
          temperature: weatherList.main.temp,
          weatherType: weatherList.weather[0].description,
          weatherDescription: weatherList.weather[0].main,
          icon: this._getIcon(weatherList.weather[0].id),
        });
    }.bind(this))
  },

  componentWillMount() {
    this.getWeather();
  },

  render() {
    return <div className="weather-body">
      <Skycons color="white" icon={this.state.icon} />
      <h1 className="temperature">
        {parseInt(this.state.temperature, 10)}
      </h1>
      <h5>
        {this.state.city}{this.state.country ? ", " + this.state.country : null}
      </h5>
      <h3 className="description">{this.state.weatherType}</h3>
      {this._renderForm()}
    </div>;
  },

  _renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Enter your city</legend>
          <input className="form-input"
                 type="text"
                 onChange={this.onChange} value={this.state.city}/>
        </fieldset>
      </form>
    );
  },

  handleSubmit(e) {
    e.preventDefault();
    this.getWeather();
  },

  onChange: function(e) {
    this.setState({city: e.target.value});
  },

  _getIcon(id) {
    if(id >= 200 && id < 300){
      return "RAIN";
    } else if (id >= 300 && id < 500){
      return "SLEET";
    } else if (id >= 500 && id < 600){
      return "RAIN";
    } else if (id >= 600 && id < 700){
      return "SNOW";
    } else if (id >= 700 && id < 800){
      return "FOG";
    } else if (id === 800){
      return "CLEAR_DAY";
    } else if (id >= 801 && id < 803){
      return "PARTLY_CLOUDY_DAY";
    } else if (id >= 802 && id < 900){
      return "CLOUDY";
    } else if (id === 905 || (id >= 951 && id <= 956)){
      return "WIND";
    } else if (id >= 900 && id < 1000){
      return "RAIN";
    }
  },
});


React.render(<App />, document.body);
