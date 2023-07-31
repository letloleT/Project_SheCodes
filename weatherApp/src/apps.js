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

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  // console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col tempCheck">
      <div>${formatDate(forecastDay.time)}</div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png" class="forecastImg" alt="" />
      <div class="temperature">
        <span id="forecast-max-temperature"><strong>${Math.round(
          forecastDay.temperature.maximum
        )}°</strong></span>
        <span id="forecast-min-temperature">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ta8of46b0a3a9f030b9f4d2457bdb911";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  celsiusTemperature = response.data.temperature.current;

  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;
  let dateElement = document.querySelector("#date");
  let mainIcon = response.data.condition.icon;
  let cityElement = document.querySelector("#cityName");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#theTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let humidityElement = document.querySelector("#theHumidity");
  humidityElement.innerHTML = humidity;
  let windSpeedElement = document.querySelector("#theWindSpeed");
  windSpeedElement.innerHTML = windSpeed;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  dateElement.innerHTML = setDate(response.data.time * 1000);
  let mainIconElement = document.querySelector("#mainWeatherIcon");
  mainIconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${mainIcon}.png`
  );
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "ta8of46b0a3a9f030b9f4d2457bdb911";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature);
}

function formSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#searchCity");
  search(cityElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#theTemperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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

search("Tlokweng");
