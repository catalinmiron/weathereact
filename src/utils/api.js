const fetchWeather = (city) => {
  const API_URL = `${process.env.REACT_APP_URL}/forecast/daily?q=${city}&units=metric&cnt=7&appid=${process.env.REACT_APP__KEY}`
  return fetch(API_URL).then((response) => response.json());
}

export { fetchWeather }
