
// Function to handle click of search button
function searchCity(event) {
    // Prevent searh form default to save form input
    event.preventDefault();

    // Render search history
    renderSearchHistory();
    // console.log(city)
}

// Function to render search history 
function renderSearchHistory() {
    // store search input value i.e, name of city
    let city = document.querySelector("#search-input").value

    // Generate search history buttons: create/set content and prepend buttons to page
    let searchedCityBtn = document.createElement("div");
    searchedCityBtn.innerHTML = `
                                 <button class ="row">${city}</button>
                                `
    document.querySelector("#history").prepend(searchedCityBtn);
}

// event listener for the button to search for city
document.querySelector("#search-button").addEventListener("click", searchCity)