// OpenWeatherMap API Key (Free tier)
const API_KEY = 'b6fd43b69d91a895b7e9f4c3236daeaa';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const geolocationBtn = document.getElementById('geolocationBtn');
const weatherContainer = document.getElementById('weatherContainer');
const welcomeContainer = document.getElementById('welcomeContainer');
const loadingContainer = document.getElementById('loadingContainer');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
searchForm.addEventListener('submit', handleSearch);
geolocationBtn.addEventListener('click', handleGeolocation);

// Search Weather by City
async function handleSearch(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    await fetchWeatherByCity(city);
}

// Fetch Weather by City Name
async function fetchWeatherByCity(city) {
    try {
        showLoading();
        clearError();
        
        const response = await fetch(
            `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found. Please try another search.');
        }
        
        const data = await response.json();
        await displayWeather(data);
        
    } catch (error) {
        showError(error.message);
        hideLoading();
    }
}

// Handle Geolocation
async function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoading();
    clearError();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            showError('Unable to access your location. ' + error.message);
            hideLoading();
        }
    );
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        
        const data = await response.json();
        await displayWeather(data);
        
    } catch (error) {
        showError(error.message);
        hideLoading();
    }
}

// Display Current Weather
async function displayWeather(data) {
    try {
        const { name, sys, main, weather, wind, clouds, visibility, dt, coord } = data;
        
        // Update current weather UI
        document.getElementById('location').textContent = `${name}, ${sys.country}`;
        document.getElementById('temperature').textContent = Math.round(main.temp);
        document.getElementById('weatherDescription').textContent = 
            weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
        document.getElementById('feelsLikeTemp').textContent = Math.round(main.feels_like);
        document.getElementById('humidity').textContent = `${main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${wind.speed} m/s`;
        document.getElementById('pressure').textContent = `${main.pressure} hPa`;
        document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
        
        // Update weather icon
        updateWeatherIcon(weather[0].main, weather[0].icon);
        
        // Fetch 5-day forecast
        await fetchForecast(coord.lat, coord.lon);
        
        // Show weather container, hide welcome
        hideLoading();
        welcomeContainer.classList.add('hidden');
        weatherContainer.classList.remove('hidden');
        cityInput.value = '';
        
    } catch (error) {
        showError('Error displaying weather data');
        hideLoading();
    }
}

// Fetch 5-Day Forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Unable to fetch forecast data');
        }
        
        const data = await response.json();
        displayForecast(data.list);
        
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

// Display 5-Day Forecast
function displayForecast(forecastList) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    // Get daily forecasts (every 8 entries = 24 hours apart in 3-hour intervals)
    const dailyForecasts = [];
    const seenDates = new Set();
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toLocaleDateString();
        
        if (!seenDates.has(dateStr) && dailyForecasts.length < 5) {
            seenDates.add(dateStr);
            dailyForecasts.push(item);
        }
    });
    
    // Display each day's forecast
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'bg-white/80 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition';
        forecastCard.innerHTML = `
            <p class="text-gray-700 font-semibold">${dayName}</p>
            <p class="text-gray-500 text-sm mb-3">${dayDate}</p>
            <i class="fas ${getWeatherIconClass(day.weather[0].main)} text-3xl text-blue-500 mb-3"></i>
            <p class="text-2xl font-bold text-gray-800">${Math.round(day.main.temp)}°C</p>
            <p class="text-xs text-gray-600 mt-2">${day.weather[0].main}</p>
            <p class="text-xs text-gray-600">💧 ${day.main.humidity}%</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Update Weather Icon based on condition
function updateWeatherIcon(condition, iconCode) {
    const iconElement = document.getElementById('weatherIcon');
    const iconClass = getWeatherIconClass(condition);
    iconElement.className = `fas ${iconClass} icon-lg text-blue-500`;
}

// Get Weather Icon Class
function getWeatherIconClass(condition) {
    const conditions = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };
    
    return conditions[condition] || 'fa-cloud';
}

// UI Helper Functions
function showLoading() {
    loadingContainer.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
    welcomeContainer.classList.add('hidden');
}

function hideLoading() {
    loadingContainer.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
    welcomeContainer.classList.add('hidden');
}

function clearError() {
    errorContainer.classList.add('hidden');
    errorMessage.textContent = '';
}

// Auto-load weather for default city on page load
window.addEventListener('load', () => {
    // Optional: Load weather for a default city
    // fetchWeatherByCity('London');
});
