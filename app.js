document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'fc4dec25ee9f5fee7ddfde665b8a7577'; // API ключ от OpenWeatherMap
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=' + apiKey;

    const weatherCard = document.getElementById('weatherCard');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const weather = data.weather[0].description;
            const tempCelsius = Math.round(data.main.temp - 273.15);
            const humidity = data.main.humidity;

            const weatherInfo = `
                <h2>${city}</h2>
                <p>Weather: ${weather}</p>
                <p>Temperature: ${tempCelsius}°C</p>
                <p>Humidity: ${humidity}%</p>
            `;
            weatherCard.innerHTML = weatherInfo;
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            weatherCard.innerHTML = '<h2>Error fetching weather data</h2>';
        });
});
