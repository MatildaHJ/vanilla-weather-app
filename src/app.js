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

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  let icon = document.querySelector("#todayIcon");
  let temp = Math.round(celsiusTemp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let description = response.data.weather[0].description;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = `${temp}°C`;
  document.querySelector("#low").innerHTML = `${lowTemp}°C`;
  document.querySelector("#high").innerHTML = `${highTemp}°C`;
  document.querySelector("#todayWeather").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
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
}

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
  if (link.innerHTML === "See in Fahrenheit") {
    tempElement.innerHTML = Math.round(fahrenheitTemp) + "°F";
    link.innerHTML = "See in Celsius";
  } else {
    tempElement.innerHTML = Math.round(celsiusTemp) + "°C";
    link.innerHTML = "See in Fahrenheit";
  }
}

let link = document.querySelector("#fahrenheit");
link.addEventListener("click", changeUnit);

let celsiusTemp = null;

let theme = document.querySelector("#bgImage");
if (hours > 19) {
  theme.style.backgroundImage = 'url("src/bgNight.jpg")';
} else {
  if (hours < 7) {
    theme.style.backgroundImage = 'url("src/bgNight.jpg")';
  }
}
searchCity("Stockholm");
