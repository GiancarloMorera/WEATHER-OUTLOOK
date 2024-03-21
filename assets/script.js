document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "79e7a29f2fabdca96aafbc975c7399b0";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

    const weatherContainer = document.getElementById("weather");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const cityName = document.getElementById("city-name").value.trim();

        if (cityName) {
            fetchWeatherData(cityName);
        } else {
            alert("Please enter a city name.");
        }
    });

    function fetchWeatherData(cityName) {
        fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderWeather(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("City not found. Please enter a valid city name.");
            });
    }

    function renderWeather(data) {
        weatherContainer.innerHTML = "";

        const cityName = data.city.name;
        const forecasts = data.list;

        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dateString = date.toLocaleDateString();
            const timeString = date.toLocaleTimeString();

            // Convert temperature from Kelvin to Fahrenheit
            const temperatureKelvin = forecast.main.temp;
            const temperatureFahrenheit = ((temperatureKelvin - 273.15) * 9/5) + 32;

            const description = forecast.weather[0].description;

            const weatherItem = document.createElement("div");
            weatherItem.classList.add("weather-item");

            weatherItem.innerHTML = `
                <h2>${dateString} ${timeString}</h2>
                <p>Temperature: ${temperatureFahrenheit.toFixed(2)} °F</p>
                <p>Description: ${description}</p>
            `;

            weatherContainer.appendChild(weatherItem);
        });
    }
});
