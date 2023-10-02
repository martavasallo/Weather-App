const APIKEY = '376628fc58a96623637f47269d74581f';

const input = document.getElementById('input');
const city = document.getElementById('city');
const date = document.getElementById('date');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');


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
  const urlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
  fetch(urlCoordinates)
  .then(response => response.json())
  .then(showWeather)
};

const showWeather = (data) => {
  console.log(data);
  city.innerText = data.name;
  temperature.innerText = `${Math.round(data.main.temp - 273.15)}°C`;
  description.innerText = data.weather[0].description;
  icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  const today = new Date();
  const localOffset = data.timezone + today.getTimezoneOffset() * 60;
  const localDate = new Date(today.setUTCSeconds(localOffset));
  const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = localDate.toLocaleDateString("en-US", options);
  date.innerText = formattedDate;
}


const form = document.querySelector('form');
searchForm.addEventListener('submit', fetchWeatherByCity);
