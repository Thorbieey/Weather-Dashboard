// Arrays of searched cities 
let cities = [];
// Variable to store search input value (i.e, name of city) 
let searchedCity;


init();
function init() {
    // Render search history
    renderSearchHistory();
    
}

// Function to handle click of search button
function searchCity(event) {
    // Prevent searh form default to save form input
    event.preventDefault();
    
    // Store search input value (i.e, name of city) & and update local storage
    searchedCity = document.querySelector("#search-input").value
    if (cities === null) {
        // If there is no search history
        cities = []; 
    } 
    cities.push(searchedCity);
    localStorage.setItem("searchHistory", JSON.stringify(cities));
    
    // Render search history
    renderSearchHistory();
    // Render current weather conditions for search city
    renderCurrentConditions();
    
}

// Function to render current weather conditions for selected location
function renderCurrentConditions() {
    // Fetch information about city geographic names & co-ordinates
    fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=1&appid=3c64b891a9b4f02005c165da06e7c870`)
        .then(response => response.json())
        .then(response =>{
            console.log(response[0].lat);
            console.log(response[0].lon);
            // Fetch information about weather conditions based on the city's geographical location lat/long
            return fetch (`http://api.openweathermap.org/data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=3c64b891a9b4f02005c165da06e7c870`)
        })
    
    .then(response => response.json())
    .then(response =>{
        console.log(response)
    })
}

// Function to render search history 
function renderSearchHistory() {
    document.querySelector("#history").textContent = "";
    cities = JSON.parse(localStorage.getItem("searchHistory"));
    if (cities !== null) {
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
                // Generate search history buttons: create/set content and prepend buttons to page
                let searchedCityBtn = document.createElement("div");
                searchedCityBtn.innerHTML = `
                                            <button class ="row">${city}</button>
                                            `
                document.querySelector("#history").prepend(searchedCityBtn);
        }
    }   
}

// event listener for the button to search for city
document.querySelector("#search-button").addEventListener("click", searchCity)