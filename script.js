const APIKEY = '376628fc58a96623637f47269d74581f';

const input = document.getElementById('input');
const date = document.getElementById('date');
const city = document.getElementById('city');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const main = document.getElementById('main');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const currentLocation = document.getElementById('currentLocation');


const fetchWeatherByCity = (event) => {
  event.preventDefault();
  const inputCity = input.value;
  const urlCityName = `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${APIKEY}`
  fetch(urlCityName)
  .then(response => response.json())
  .then(data => {
    const latitude = data[0].lat
    const longitude = data[0].lon
    fectchWeatherByCoordinates(latitude, longitude);
  })
};

const fectchWeatherByCoordinates = (latitude, longitude) => {
  const urlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`
  fetch(urlCoordinates)
  .then(response => response.json())
  .then(showWeather)
};

const showWeather = (data) => {
  console.log(data.sys.country);
  // CITY NAME
  city.innerText = data.name;

  // COUNTRY
  country.innerText = data.sys.country

  // TEMPERATURE
  temperature.innerText = `${Math.round(data.main.temp)}°C`;

  // MAIN
  main.innerText = data.weather[0].main;

  // DESCCRIPTION
  const descriptionText = data.weather[0].description;
  const descriptionCapitalized = descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1);
  description.innerText = descriptionCapitalized;

  // ICON
  icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  // TIME
  const today = new Date();
  const localOffset = data.timezone + today.getTimezoneOffset() * 60;
  const localDate = new Date(today.setUTCSeconds(localOffset));

  const hour = localDate.getHours().toString().padStart(2, '0');
  const minute = localDate.getMinutes().toString().padStart(2, '0');

  const formattedTime = `Local time ${hour}:${minute}`;
  date.innerText = formattedTime;

}

const fetchCurrentPosition = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((data) => {
    fectchWeatherByCoordinates(data.coords.latitude, data.coords.longitude)
  })
}

const form = document.querySelector('form');
searchForm.addEventListener('submit', fetchWeatherByCity);
currentLocation.addEventListener('click', fetchCurrentPosition);
