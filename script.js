const APIKEY = '376628fc58a96623637f47269d74581f';

const input = document.getElementById('input');
const currentLocation = document.getElementById('currentLocation');

const date = document.getElementById('date');
const time = document.getElementById('time');

const city = document.getElementById('city');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const main = document.getElementById('main');
const description = document.getElementById('description');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const card = document.querySelector('.card');
const icon = document.getElementById('icon');
const footer = document.querySelector('.footer');


const fetchWeatherByCity = (event) => {
  event.preventDefault();
  const inputCity = input.value;
  const urlCityName = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appid=${APIKEY}`
  fetch(urlCityName)
  .then(response => response.json())
  .then(data => {
    const latitude = data[0].lat
    const longitude = data[0].lon
    fectchWeatherByCoordinates(latitude, longitude);
  })
  input.value = ""
};

const fectchWeatherByCoordinates = (latitude, longitude) => {
  const urlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`
  fetch(urlCoordinates)
  .then(response => response.json())
  .then(showWeather)
};

const showWeather = (data) => {
  // console.log(data);

  // Card
  card.style.display = 'block';

  // City name
  city.innerText = data.name;

  // Country
  country.innerText = data.sys.country

  // Temperature
  temperature.innerText = `${Math.round(data.main.temp)}°C`;

  // Main
  main.innerText = data.weather[0].main;

  // Description
  const weatherDescription = data.weather[0].description;
  description.innerText = weatherDescription;

  // Time
  const today = new Date();
  const localOffset = data.timezone + today.getTimezoneOffset() * 60;
  const localDate = new Date(today.setUTCSeconds(localOffset));
  const formattedTime = localDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  date.innerText = formattedTime;
  time.innerHTML = 'Local time'

  // Humidity
  humidity.innerHTML = '<i class="bi bi-droplet-fill"></i>' + " " + data.main.humidity + "%"

  // Wind
  const windMeterSecond = data.wind.speed
  const windKmH = Math.round(windMeterSecond * 3.6)
  wind.innerHTML = '<i class="bi bi-wind"></i>' + " " + windKmH + " km/h";

  // Sunrise
  const sunriseTime = new Date(data.sys.sunrise * 1000)
  .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  sunrise.innerHTML = '<i class="bi bi-brightness-alt-high-fill"></i>' + " " + sunriseTime;

  // Sunset
  const sunsetTime = new Date(data.sys.sunset * 1000)
  .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  sunset.innerHTML = '<i class="bi bi-moon-fill"></i>' + " " + sunsetTime;

  // Icons
  const hour = parseInt(formattedTime.split(':')[0]);
  let iconSrc = '';

  switch (true) {
    case weatherDescription.includes('clear'):
      iconSrc = (hour >= 6 && hour < 20) ? './icons/clear-day.gif' : './icons/clear-night.gif';
      break;
    case weatherDescription.includes('clouds'):
      iconSrc = './icons/clouds.gif';
      break;
    case weatherDescription.includes('thunderstorm'):
      iconSrc = './icons/thunderstorm.gif';
      break;
    case weatherDescription.includes('drizzle'):
      iconSrc = './icons/drizzle.gif';
      break;
    case weatherDescription.includes('rain'):
      iconSrc = './icons/rain.gif';
      break;
    case weatherDescription.includes('snow'):
      iconSrc = './icons/snow.gif';
      break;
    default:
      iconSrc = './icons/atmosphere.gif';
      break;
  }

  icon.src = iconSrc;
  icon.style.display = 'inline-block';


  // Footer
  footer.style.display = 'block';
};

const fetchCurrentPosition = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((data) => {
    fectchWeatherByCoordinates(data.coords.latitude, data.coords.longitude)
  })
};

// Form submission event listener
const form = document.querySelector('form');
searchForm.addEventListener('submit', fetchWeatherByCity);
currentLocation.addEventListener('click', fetchCurrentPosition);
