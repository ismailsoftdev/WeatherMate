const form = document.querySelector("form");
const locationInput = document.querySelector("input");
const weatherData = document.querySelector("#weather-data");
const loadingIndicator = document.querySelector(".loader");

loadingIndicator.style.display = "none";

// Function to fetch weather data from API
async function getWeather(location) {
    const apiKey = "b4d23d531debc4209675fd1fc6b341eb";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200) {
        // Error: location not found
        return null;
    }

    return data;
}

// Event listener for form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = locationInput.value;
    // Show loading indicator
    weatherData.innerHTML = "";
    loadingIndicator.style.display = "inline-block";

    // Fetch weather data
    const weather = await getWeather(location);


    // Hide loading indicator
    loadingIndicator.style.display = "none";

    if (!weather) {
        // Show error message
        weatherData.innerHTML = `<h3>Location not found or there's a server problem</h3>`;
        return;
    }

  // Display the weather data on the page
    weatherData.innerHTML = `

    <h3>${weather.name} </h3>
    <p>Weather condition: <b>${weather.weather[0].description}</b></p>
    <p>Temperature: <b>${weather.main.temp}°C</b></p>
    <p>Humidity: <b>${weather.main.humidity}%</b></p>
    <p>Pressure: <b>${weather.main.pressure} hPa</b></p>
    <p>Sunrise: <b>${weather.sys.sunrise}</b></p>
    <p>Sunset: <b>${weather.sys.sunset}</b></p>
    <p>Cloud cover: <b>${weather.clouds.all}</b></p>

        `;
});
