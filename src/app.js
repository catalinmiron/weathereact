import React from "react"
import { fetchWeather } from "./utils/api"
import fetch from "whatwg-fetch"
import _ from "lodash"
import randomColor from "randomcolor";

import WeekWeather from "./components/WeekWeather"

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

  getWeather(searchedCity = this.state.city) {
    fetchWeather(searchedCity)
      .then((response) => {
        var weather = _.map(response.list, (dayWeather) => {
          return {
            dayWeather,
            country: response.city.country,
            city: response.city.name
          }
        });

        this.setState({
          weekWeather: weather,
          city: this.state.searchedCity,
          color: randomColor({luminosity: "dark", format: "hex"})
        });
      })
  }

  render() {
    return <div className="weather-container"
                style={{backgroundColor: this.state.color}}>
      {_.isEmpty(this.state.weekWeather) ? "no data" :
        <WeekWeather color={this.state.color}
                     weekWeather={this.state.weekWeather} />}
      {this._renderForm()}
      <blockquote className="blockquote blockquote-centered">
        <p>
          Created by
          <a href="http://twitter.com/mironcatalin"> @mironcatalin</a>
        </p>
      </blockquote>
    </div>;
  }

  _renderForm() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <fieldset>
          <legend>Enter your city</legend>
          <input className="form-input"
                 ref="locationName"
                 type="text"
                 defaultValue={this.state.searchedCity}/>
        </fieldset>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const searchedCity = this.refs.locationName.getDOMNode().value;

    if (searchedCity === this.state.city) {
      return;
    }

    this.getWeather(searchedCity);
  }
};


React.render(<App />, document.body);
