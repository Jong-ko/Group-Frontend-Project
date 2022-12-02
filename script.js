
// api key = c7dbf73d45d5d81e77ec919553791f1f



form.addEventListener("submit", (e) => {
    e.preventDefault();
   fetchWeather()

    });

async function fetchWeather() {

 const citySearch = document.getElementsByClassName("search")[0].value;


    try {
        const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=c7dbf73d45d5d81e77ec919553791f1f&units=imperial`);
        const weatherData = await results.json();
        console.log(weatherData);
        const cityName = weatherData.name;
        const currentTemp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const weatherDescription = weatherData.weather[0].description;
        console.log({cityName,currentTemp,weatherDescription})
        const weatherElement = document.getElementById("weather");
        
        weatherElement.innerHTML = 
         ///weather description 
        `<p> ${weatherDescription}. <br>
        The current temperature in ${cityName} is ${currentTemp}°F <br>
        with humidity levels of ${humidity}% <br>
        and wind speeds of ${windSpeed} m/s`


    } catch (error) {
        console.log("Something went wrong fetching the weather API", error)
    }
}

fetchWeather();




