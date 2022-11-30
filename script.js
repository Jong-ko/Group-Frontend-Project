async function fetchWeather() {
    try {
        const results = await fetch("https://api.openweathermap.org/data/2.5/weather?q=okinawa&appid=c7dbf73d45d5d81e77ec919553791f1f&units=imperial");
        const weatherData = await results.json();
        console.log(weatherData);
        const cityName = weatherData.name;
        const currentTemp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        console.log({cityName,currentTemp,weatherDescription})
        const weatherElement = document.getElementById("weather");
        weatherElement.innerHTML = `<p> The current temperature in ${cityName} is ${currentTemp}`
    } catch (error) {
        console.log("Something went wrong fetching the weather API", error)
    }
}

fetchWeather();
