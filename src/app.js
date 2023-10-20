let now = new Date();
let todaysDate = document.querySelector("#timeDate");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mars",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeDate.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastResults");
  let forecastDayList = document.querySelector("#forecastDays");

  let forecastDaysHTML = "";
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
   <span id="firstDayMin">${Math.round(
     forecastDay.temperature.minimum
   )}°</span>/<span id="firstDayMax"
                      >${Math.round(forecastDay.temperature.maximum)}°</span
                    ><br />`;

      let formattedDay = formatDay(forecastDay.time);
      forecastDaysHTML += `<li id="forecastDays">${formattedDay}</li>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
  forecastDayList.innerHTML = forecastDaysHTML;
}

function getForecast(coordinates) {
  let apiKey = "bf3o0930bd56bb8b43fbe8a4cftca0a1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric
`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  maxTemp = response.data.main.temp_max;
  minTemp = response.data.main.temp_min;
  let icon = document.querySelector("#todayIcon");
  let temp = Math.round(celsiusTemp);
  let highTemp = Math.round(maxTemp);
  let lowTemp = Math.round(minTemp);
  let description = response.data.weather[0].description;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = `${temp}°C`;
  document.querySelector("#low").innerHTML = `${lowTemp}°C`;
  document.querySelector("#high").innerHTML = `${highTemp}°C`;
  document.querySelector("#todayWeather").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = response.data.wind.speed + "m/s";
  if (description.includes("clouds")) {
    icon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  } else if (description === "clear sky") {
    icon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else if (description.includes("drizzle") || description.includes("rain")) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (description.includes("shower") && description.includes("rain")) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  } else if (description.includes("thunderstorm")) {
    icon.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (description.includes("snow") || description.includes("sleet")) {
    icon.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  } else if (
    description.includes("mist") ||
    description.includes("fog") ||
    description.includes("haze") ||
    description.includes("smoke") ||
    description.includes("sand") ||
    description.includes("dust") ||
    description.includes("ash")
  ) {
    icon.innerHTML = `<i class="fa-solid fa-smog"></i>`;
  }
  getForecast(response.data.coord);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0a7aef75306a5034895471348f6ec8db";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);

function searchCity(city) {
  let unit = "metric";
  let apiKey = "0a7aef75306a5034895471348f6ec8db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function changeUnit(event) {
  event.preventDefault();
  let link = document.querySelector("#fahrenheit");
  let tempElement = document.querySelector("#degrees");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let minFahrenheit = (minTemp * 9) / 5 + 32;
  let maxFahrenheit = (maxTemp * 9) / 5 + 32;
  if (link.innerHTML === "See in Fahrenheit") {
    tempElement.innerHTML = Math.round(fahrenheitTemp) + "°F";
    lowTempElement.innerHTML = Math.round(minFahrenheit) + "°F";
    highTempElement.innerHTML = Math.round(maxFahrenheit) + "°F";
    link.innerHTML = "See in Celsius";
  } else {
    tempElement.innerHTML = Math.round(celsiusTemp) + "°C";
    lowTempElement.innerHTML = Math.round(minTemp) + "°C";
    highTempElement.innerHTML = Math.round(maxTemp) + "°C";
    link.innerHTML = "See in Fahrenheit";
  }
}
let lowTempElement = document.querySelector("#low");
let highTempElement = document.querySelector("#high");

let link = document.querySelector("#fahrenheit");
link.addEventListener("click", changeUnit);

let celsiusTemp = null;
let maxTemp = null;
let minTemp = null;

let theme = document.querySelector("#bgImage");
if (hours > 19) {
  theme.style.backgroundImage = 'url("src/bgNight.jpg")';
} else {
  if (hours < 7) {
    theme.style.backgroundImage = 'url("src/bgNight.jpg")';
  }
}
searchCity("Stockholm");
