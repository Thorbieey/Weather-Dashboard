// Arrays of searched cities 
let cities = [];
// Variable to store search input value (i.e, name of city) 
let searchedCity;


init();
function init() {
    // Render search history
    renderSearchHistory();

    // Set default for displaying weather info to London
    searchedCity = document.querySelector(".weather-search").placeholder;
    getWeatherInfo();
}

// Function to handle click of search button
function searchCity(event) {
    // Prevent searh form default to save form input
    event.preventDefault();
    
    // Store search input value (i.e, name of city) & and update local storage
    searchedCity = document.querySelector("#search-input").value
    if (cities === null) {
        // If there is no search history reset class from null to array
        cities = []; 
    } 
    else if (searchedCity ==="") {
        // if no city is entered
        alert("Please enter valid City")
    }
    else{
        // if a city name is entered
        cities.push(searchedCity);
        // Reverse city array and remove duplicates
        cities = [...new Set(cities.reverse())];
        // Store reveresed Cities array in search history local storage version
        localStorage.setItem("searchHistory", JSON.stringify(cities.reverse()));
        // Clear search input value
        document.querySelector("#search-input").value = "";
        
        // Render search history
        renderSearchHistory();
        // Render current weather conditions for search city
        getWeatherInfo();
    }  
}

// Function to get weather conditions for selected location
function getWeatherInfo() {
    // Fetch information about selected city geographic names & co-ordinates
    fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=3&appid=3c64b891a9b4f02005c165da06e7c870`)
        .then(response => response.json())
        .then(cityGeo =>{
            // Fetch information about weather conditions based on the city's geographical location lat/long
            return fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${cityGeo[0].lat}&lon=${cityGeo[0].lon}&appid=3c64b891a9b4f02005c165da06e7c870`)
        })
    
    .then(response => response.json())
    .then(weatherData =>{
        // Display current weather conditions
       return renderCurrentConditions(weatherData);
    })
}

// Function to display current weather conditions for selected city
function renderCurrentConditions(weatherData){
     // Generate search history buttons: create/set content and prepend buttons to page
    document.querySelector("#today").innerHTML = `
                                <h2>${weatherData.city.name} (${moment(weatherData.list[0].dt, "X").format("DD/MM/YYYY")}) <img id="forecast-icon" src ="http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png"/></h2>
                                <p>Temp: ${(weatherData.list[0].main.temp -273.15).toFixed(2)} °C</p>
                                <p>Wind: ${(weatherData.list[0].wind.speed *3.6).toFixed(2)} KPH</p>
                                <p>Humidity: ${weatherData.list[0].main.humidity} %</p>
                                `;
    // Display weather forecast
    return render5DayForecast(weatherData);
}

// Function to display weather conditions for next 5 days on cards
function render5DayForecast(weatherData){
    // Reset Forecast Section display content
    document.querySelector("#forecast").textContent = "";

    // Add Forecast Section heading
    let forecastSectionHeading = document.createElement("h4");
    forecastSectionHeading.textContent = "5-Day Forecast:";
    forecastSectionHeading.setAttribute("class", "forecast-heading col-lg-12");
    document.querySelector("#forecast").append(forecastSectionHeading);
    
    // Array of index for dates/times we would like to retrieve weather forcast about
    let dayIndexes = ["4", "12", "20", "28", "36"];
    for (let i = 0; i < dayIndexes.length; i++) {
        const dayIndex = dayIndexes[i];
        let forecastCards = document.createElement("div");
        forecastCards.setAttribute("class", "card forecast-card col-lg-2");
        forecastCards.innerHTML = `
                                        <h5>${moment(weatherData.list[dayIndex].dt, "X").format("DD/MM/YYYY")}</h5>
                                        <img id="forecast-icon" src ="http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png"/>
                                        <p>Temp: ${(weatherData.list[dayIndex].main.temp -273.15).toFixed(2)} °C</p>
                                        <p>Wind: ${(weatherData.list[dayIndex].wind.speed *3.6).toFixed(2)} KPH</p>
                                        <p>Humidity: ${weatherData.list[dayIndex].main.humidity} %</p>
                                        `;
        document.querySelector("#forecast").append(forecastCards);
    }
    
}

// Function to render search history 
function renderSearchHistory() {
    // Reset History Section display content
    document.querySelector("#history").textContent = "";
    cities = JSON.parse(localStorage.getItem("searchHistory"));
    if (cities !== null) {
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
                // Generate search history buttons: create/set content and prepend buttons to page
                let cityBtns = document.createElement("div");
                cityBtns.innerHTML = `
                                            <button class="btn col-lg-12 city-button" id = "${city}-button">${capitalizeFirstLetter(city)}</button>
                                            `;
                document.querySelector("#history").prepend(cityBtns);
        }
    }   
}

// Function to capitalize the first letter of cities displayed in search history
function capitalizeFirstLetter(city) {
        return city.charAt(0).toUpperCase() + city.slice(1);
    
    
}

// Function to set searched city to content of city-button
function getCityFromHistory(event) {
    if (event.target.matches("button")) {
        // Set default for displaying weather info to London
        searchedCity = event.target.textContent;
        getWeatherInfo();    
    }
}

// Event listener for the button to get weather info for inputted city
document.querySelector("#search-button").addEventListener("click", searchCity);
// Event listener for buttons in search history to get weather info for clicked city
document.querySelector("#history").addEventListener("click", getCityFromHistory);