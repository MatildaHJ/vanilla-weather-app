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
  let temp = Math.round(response.data.main.temp);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = `${temp}°C`;
  document.querySelector("#low").innerHTML = `${lowTemp}°C`;
  document.querySelector("#high").innerHTML = `${highTemp}°C`;
  document.querySelector("#todayWeather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
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

let theme = document.querySelector("#bgImage");
if (hours > 19) {
  theme.style.backgroundImage = 'url("src/bgNight.jpeg")';
}
searchCity("Stockholm");
