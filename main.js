// OpenWeatherMap API key (you need to sign up and get your own API key)
const apiKey = 'f756cab2bb02e92c41eb8abd1c1c541c';

document.getElementById('getWeather').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  if (location) {
    fetchWeatherByLocation(location);
  } else {
    getUserLocation();
  }
});

function fetchWeatherByLocation(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        showError('City not found. Please try again.');
      }
    })
    .catch(error => {
      showError('An error occurred while fetching the weather data.');
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByCoordinates(lat, lon);
    }, () => {
      showError('Unable to access your location.');
    });
  } else {
    showError('Geolocation is not supported by this browser.');
  }
}

function fetchWeatherByCoordinates(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        showError('Unable to fetch weather data for your location.');
      }
    })
    .catch(error => {
      showError('An error occurred while fetching the weather data.');
    });
}

function displayWeatherData(data) {
  const weatherInfo = document.getElementById('weather-info');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const weatherCondition = document.getElementById('weather-condition');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('wind-speed');
  
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  
  weatherInfo.classList.remove('hidden');
  document.getElementById('error-message').classList.add('hidden');
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  document.getElementById('weather-info').classList.add('hidden');
}
