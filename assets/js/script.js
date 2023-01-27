// Arrays of searched cities 
let cities = [];

// ("button").on("click", function() {
//     var animal = $(this).attr("data-animal");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       animal + "&api_key=S07O3AAjIHKTKBroLcQ9OHmbxwHRULya&limit=10";
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function({data}) {
  
//       for (var i = 0; i < data.length; i++) {
//         let gifEl = document.createElement("div");
//         console.log(data[i])
//         gifEl.innerHTML = `
//                           <h1>Rating: ${data[i].rating}</h1>
//                           <img src = "${data[i].images.fixed_height.url}" alt ="${data[i].title}"></img>`
//         document.querySelector("#gifs-appear-here").prepend(gifEl)
//       }
//     });
//   });

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
    let searchedCity = document.querySelector("#search-input").value
    if (cities === null) {
        // If there is no search history
        cities = []; 
    } 
    cities.push(searchedCity);
    localStorage.setItem("searchHistory", JSON.stringify(cities));

    // Render search history
    renderSearchHistory();
    
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
                console.log(cities);
        }
    }   
}

// event listener for the button to search for city
document.querySelector("#search-button").addEventListener("click", searchCity)