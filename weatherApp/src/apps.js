function setDate() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[today.getDay()];

  let time = today.getHours() + ":" + today.getMinutes();
  let dateTime = day + " " + time;
  // console.log(dateTime);

  let li = document.querySelector("li#currentTime");
  li.innerHTML = dateTime;
}

function formSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity");
  let cityName = city.value;
  let country = document.querySelector("#cityName");
  country.innerHTML = cityName;

  let apiKey = "1e4caab4527dc113d83cf553f3bdaf2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let citySearch = document.querySelector("#findCity");
citySearch.addEventListener("submit", formSubmit);

setDate();

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  // console.log(temperature);
  let humidity = response.data.main.humidity;
  // console.log(humidity);
  let windSpeed = response.data.wind.speed;
  // console.log(windSpeed);

  let temperatureElement = document.querySelector("#theTemperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let humidityElement = document.querySelector("#theHumidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let speedElement = document.querySelector("#theWindSpeed");
  speedElement.innerHTML = `Wind: ${windSpeed}km/h`;
}

function retrievePosition(position) {
  let apiKey = "1e4caab4527dc113d83cf553f3bdaf2f";
  let lat = position.coords.latitude;
  // console.log(lat);
  let lon = position.coords.longitude;
  // console.log(lon);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  // console.log(url);
  axios.get(url).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "1e4caab4527dc113d83cf553f3bdaf2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let button = document.querySelector("#currentLocation");
// button.addEventListener("click", retrievePosition);
button.addEventListener("click", getCurrentLocation);
