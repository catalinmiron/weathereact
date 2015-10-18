let API_KEY = "d94bcd435b62a031771c35633f9f310a"
let apiUrl = "http://api.openweathermap.org/data/2.5/"

let fetchWeather = function(city) {
  let weeklyWeatherUrl =
    `${apiUrl}/forecast/daily?q=${city}&units=metric&cnt=7&appid=${API_KEY}`

  return fetch(weeklyWeatherUrl).then((response) => response.json());
}

export { fetchWeather }
