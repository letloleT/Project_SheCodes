function setDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response);

  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
  let mainIcon = response.data.weather[0].icon;

  let humidityElement = document.querySelector("#theHumidity");
  humidityElement.innerHTML = humidity;
  let windSpeedElement = document.querySelector("#theWindSpeed");
  windSpeedElement.innerHTML = windSpeed;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  dateElement.innerHTML = setDate(response.data.dt * 1000);
  let mainIconElement = document.querySelector("#mainWeatherIcon");
  mainIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${mainIcon}@2x.png`
  );
}

function formSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity");
  let cityName = city.value;
  let country = document.querySelector("#cityName");
  country.innerHTML = cityName;

  let apiKey = "1e4caab4527dc113d83cf553f3bdaf2f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#theTemperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#theTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let citySearch = document.querySelector("#findCity");
citySearch.addEventListener("submit", formSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitTemp");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsiusTemp");
celsiusLink.addEventListener("click", showCelsius);
