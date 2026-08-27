# Weather Dashboard

A modern, responsive weather application that provides real-time weather data and 5-day forecasts using the OpenWeatherMap API.

## 🌤️ Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and more
- **5-Day Forecast**: View weather predictions for the next 5 days
- **City Search**: Search for weather in any city worldwide
- **Geolocation**: Automatically detect your location and display local weather
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Dynamic Icons**: Weather-appropriate icons that change based on conditions

## 📋 Weather Information Displayed

- **Current Temperature**: Real-time temperature in Celsius
- **"Feels Like" Temperature**: Perceived temperature based on wind chill and humidity
- **Weather Description**: Clear description of current conditions
- **Humidity**: Percentage of atmospheric moisture
- **Wind Speed**: Wind velocity in m/s
- **Pressure**: Atmospheric pressure in hPa
- **Visibility**: How far you can see (in km)
- **5-Day Forecast**: Daily predictions with temperature, conditions, and humidity

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Tailwind CSS
- **JavaScript**: Vanilla ES6+ with async/await
- **API**: OpenWeatherMap Free API
- **Icons**: Font Awesome 6.4.0
- **Styling**: Tailwind CSS with custom glassmorphism effects

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/mmusamusaibrahim2004-dotcom/ayu-homes.git
cd ayu-homes
```

2. Open `index.html` in your web browser (no server required for basic functionality)

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## 🔑 API Key

The application uses OpenWeatherMap's free tier API. The API key is already included in the code, but you can get your own by:

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Replace the `API_KEY` in `app.js` with your own key

## 🚀 Usage

### Search by City
1. Enter a city name in the search bar (e.g., "London", "New York", "Tokyo")
2. Click the Search button or press Enter
3. View real-time weather and 5-day forecast

### Use Your Location
1. Click the location button (📍)
2. Allow browser to access your location
3. Weather data for your current location will load automatically

## 📁 Project Structure

```
ayu-homes/
├── index.html          # Main HTML file with UI structure
├── app.js              # JavaScript with API integration
└── README.md           # This file
```

## 🎨 Design Features

- **Gradient Background**: Purple to pink gradient
- **Glassmorphism Effect**: Frosted glass card design
- **Smooth Animations**: Hover effects and transitions
- **Loading State**: Animated spinner during data fetch
- **Error Handling**: Clear error messages for failed requests
- **Responsive Grid**: Adapts to all screen sizes

## 🔧 Key Functions

### `handleSearch(e)`
Handles city search form submission

### `fetchWeatherByCity(city)`
Fetches weather data from OpenWeatherMap API by city name

### `handleGeolocation()`
Requests user's location and fetches weather for that coordinates

### `fetchWeatherByCoordinates(lat, lon)`
Fetches weather data using latitude and longitude

### `displayWeather(data)`
Updates UI with current weather information

### `fetchForecast(lat, lon)`
Retrieves 5-day forecast data

### `displayForecast(forecastList)`
Renders forecast cards in the UI

## 🌐 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

**Note**: Geolocation requires HTTPS or localhost

## 📊 API Response Format

The app uses the OpenWeatherMap Current Weather API and Forecast API:

```
Current Weather Endpoint:
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric

Forecast Endpoint:
GET https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric
```

## ⚠️ Error Handling

- **City not found**: Displays error message prompting user to try another search
- **Geolocation denied**: Shows permission error
- **API errors**: Clear error messages for network or API issues
- **Invalid input**: Validates city name before API call

## 🎯 Future Enhancements

- [ ] Add hourly forecast
- [ ] Weather alerts and warnings
- [ ] Multiple city comparison
- [ ] Weather history
- [ ] Dark/Light theme toggle
- [ ] Favorites/Bookmarks
- [ ] Weather maps integration
- [ ] PWA support for offline functionality
- [ ] Local storage for recent searches
- [ ] Weather notifications

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Privacy & Security

- No user data is stored
- Location data is only used for weather lookup
- No cookies or tracking
- API calls are made directly from the browser

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests with improvements.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Developed by**: mmusamusaibrahim2004
**Last Updated**: August 2026
**Weather Data Provided by**: OpenWeatherMap
