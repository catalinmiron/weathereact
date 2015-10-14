import {API_KEY} from './../secrets';

var fetchWeather = function(city, metric) {
  let url = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=${metric}&appid=${API_KEY}`;

  return fetch(url).then((response) => response.json());
}


export { fetchWeather }
