const APIKEY = '376628fc58a96623637f47269d74581f';

const input = document.getElementById('input');
const city = document.getElementById('city');

const fetchWeatherByCity = (event) => {
  event.preventDefault();
  const inputCity = input.value;
  const urlCityName = `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${APIKEY}`
  fetch(urlCityName)
  .then(response => response.json())
  .then((data) => {
  console.log(data);
  });
}

const fectchWeatherByCoordinates = (coordinates) => {
  const urlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${APIKEY}`
  fetch(urlCoordinates)
  .then(response => response.json())
  .then((data) => {
  console.log(data);
  });
}

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', fetchWeatherByCity);
