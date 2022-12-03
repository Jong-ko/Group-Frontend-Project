//Event listener for clickable events
document.addEventListener('click', function(event) {
    //event handler when playlist is clicked
    if(event.target.classList.contains('playlist-image')) {
		setPlayer(event.target.dataset.id); //play the playlist if clicked
	}
})

//Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
   fetchWeather()

    });

//Function that gets weather data from api and displays weather information based on city submitted in form
async function fetchWeather() {

 const citySearch = document.getElementsByClassName("search")[0].value;


    try {
        const results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=c7dbf73d45d5d81e77ec919553791f1f&units=imperial`);
        const weatherData = await results.json();
        console.log(weatherData);
        let searchTerm = weatherData.weather[0].main;
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
        //call playlist function with search term based on city's weather
        await fetchPlaylist(searchTerm);

    } catch (error) {
        console.log("Something went wrong fetching the weather API", error)
    }
}

//Function that gets playlist data from api and displays playlists based on the current weather in given city
async function fetchPlaylist(searchTerm) {
    
    try {
        //fetch playlist data based on weather search term
        const results = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}%20weather%20music&order=relevance&type=playlist&maxResults=10&key=AIzaSyCt8cEXlP7DCMHJHf9QLrO_I30lZTyxZNc`);
        const playListData = await results.json();
        console.log(playListData);
        let playList = document.getElementById("playlist-list");
        //update html with playlist data
        playList.innerHTML = '';
        for(let i=0; i < playListData.items.length; i++) {
            playList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${playListData.items[i].snippet.title}</div>
                    <button><img class="playlist-image" src="${playListData.items[i].snippet.thumbnails.default.url}" data-id="${playListData.items[i].id.playlistId}"></button>
                    ${playListData.items[i].snippet.description}
                </div>
            </li>`;
        }
        //call player display function with first playlist returned
        setPlayer(playListData.items[0].id.playlistId);
    } catch (error) {
        //display error message if there are any issues in code above
        console.log("Something went wrong fetching playlist API", error);
    }
}

//Function that displays an embedded youtube player with given playlist
function setPlayer(playListID) {
    document.getElementById("player").innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed?listType=playlist&list=${playListID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}



