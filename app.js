// app.js

function getWeather() {
    var city = document.getElementById("cityInput").value;
    var apiKey = '7e95f47ce3653c8160d2a14b870a7471'; 
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&appid=" + apiKey + "&lang=ru&units=metric";

    var weatherCard = document.getElementById('weatherCard');
    weatherCard.innerHTML = '<h2>Загрузка...</h2>'; // Показать сообщение о загрузке

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        var cityName = data.name; 
        var weather = data.weather[0].description;
        var tempCelsius = Math.round(data.main.temp);
        var humidity = data.main.humidity;

        var weatherInfo = `
            <h2>${cityName}</h2>
            <p>Погодные условия: ${weather}</p>
            <p>Температура: ${tempCelsius}°C</p>
            <p>Влажность: ${humidity}%</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Погодные условия">
        `;
        weatherCard.innerHTML = weatherInfo;
    })
    .catch(error => {
        console.log("Ошибка при получении данных о погоде:", error);
        weatherCard.innerHTML = "<h2>Не удалось получить данные о погоде. Попробуйте ещё раз.</h2>";
    });
}

function getWeatherForThreeDays() {
    var city = document.getElementById("cityInput").value;
    var apiKey = '7e95f47ce3653c8160d2a14b870a7471'; 
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&appid=" + apiKey + "&lang=ru&units=metric";

    var weatherCard = document.getElementById('weatherCard');
    weatherCard.innerHTML = '<h2>Загрузка...</h2>'; // Показать сообщение о загрузке

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod !== "200") {
            throw new Error(data.message);
        }

        var weatherInfo = '';
        var daysProcessed = 0;
        var processedDates = [];

        data.list.forEach(entry => {
            var date = new Date(entry.dt * 1000);
            var hours = date.getHours();

            // Учитываем прогноз только на 12:00 каждого дня
            if (hours === 12 && daysProcessed < 3) {
                var dateString = date.toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });

                // Проверяем, чтобы не обрабатывать один и тот же день несколько раз
                if (!processedDates.includes(dateString)) {
                    var weatherDescription = entry.weather[0].description;
                    var temperature = Math.round(entry.main.temp);
                    var humidity = entry.main.humidity;
                    var iconCode = entry.weather[0].icon;
                    var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";

                    weatherInfo += `
                        <div class="day">
                            <h3>${dateString}</h3>
                            <p>Погодные условия: ${weatherDescription}</p>
                            <p>Температура: ${temperature}°C</p>
                            <p>Влажность: ${humidity}%</p>
                            <img src="${iconUrl}" alt="Погодные условия">
                        </div>
                    `;

                    processedDates.push(dateString);
                    daysProcessed++;
                }
            }
        });

        weatherCard.innerHTML = weatherInfo;
    })
    .catch(error => {
        console.log("Ошибка при получении данных о погоде:", error);
        weatherCard.innerHTML = "<h2>Не удалось получить данные о погоде. Попробуйте ещё раз.</h2>";
    });
}