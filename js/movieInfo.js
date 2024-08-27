import {getMovieById ,createMovieList} from "./data/movieData.js";

function openBooking(movieId) {
    console.log("movieId:", movieId); // Debugging

    const movie = getMovieById(movieId);

    if (movie) {
        const currentDateTime = new Date();
        console.log("currentDateTime:", currentDateTime); // Debugging
        const movieShowTime = new Date(movie.showTime);
        console.log("movieShowTime:", movieShowTime); // Debugging

        if (currentDateTime > movieShowTime) {
            alert(`The show date for "${movie.name}" has finished. You can wait for the next show date or try another movie.`);
        } else {
            window.location.href = `Booking.html?id=${movieId}`;
        }
    } else {
        console.log("No movie found with the given ID.");
    }
}

// Function to render movies
function renderMovieInfo(movie) {
    return `
        <div class="movie-info" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${movie.backdropImage}');
            background-size: cover;
            background-position: center; 
            background-repeat: no-repeat;">
            
            <div class="imgs-container">
                <img src="${movie.posterImage}" alt="${movie.name}">
            </div>

            <div class="details">
                <div>Rating: <span>${movie.rating}</span></div>
                <div>Production Show Time: <span>${movie.prodectionDate}</span></div>
                <div>Price: <span>$5</span></div>
                <button class="btn-BookNow" data-id="${movie.id}">Book Now</button>
            </div>

            <div class="info">
                <h1 class="film-title">${movie.name}</h1>
                <p class="description">${movie.story}</p>
            </div>
        </div>`;
}

// Function to display movie Info in Move Info section 
async function displayMovieInfo() {
    const container = document.querySelector('.container');
    if (!container) {
        return;
    }

    // Extract movie ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
        return;
    }

    // Ensure movieList is populated before using it
    await createMovieList(); 

    // Get the movie object by ID
    const movie = getMovieById(movieId);
    console.log(movieId); 
    if (movie) {
        container.innerHTML = renderMovieInfo(movie); // Render movie info
    } else {
        console.log(movie); 
    }
    addEventListenersToBooking();
}

// Function to add event listeners to the Booking btn when click it,it will go to Booking page 
function addEventListenersToBooking() {
    const btn = document.querySelector('.btn-BookNow'); // Select the button correctly
    if (btn) {  // Ensure the button exists
        const movieId = btn.getAttribute('data-id');
        btn.addEventListener('click', () => openBooking(movieId)); // Add the event listener directly to the button
    } else {
        console.error("Booking button not found");
    }
}

displayMovieInfo();