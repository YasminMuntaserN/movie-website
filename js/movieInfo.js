import {getMovieById ,createMovieList} from "./data/movieData.js";


// Function to render movies
function renderMovieInfo(movie) {
    return ` 
        <div class="movie-info" style="background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),  url('${movie.backdropImage}');
            background-size: cover;
            background-position: center; 
            background-repeat: no-repeat;" >

                <div class="imgs-container" >
                    <img src="${movie.backdropImage}">
                </div>

                <div class="details">
                    <div>Rating : <span>${movie.rating}</span></div>
                    <div>prduction Show time : <span>${movie.prodectionDate}</span></div>
                    <div>price : <span>5$</span></div>
                    <button class="btn-BookNow">Book Now</button>
                </div>

                <div class ="info">
                    <h1 class="film-title">${movie.name}</h1>
                    <p class="description">${movie.story}</p>
                </div>
        </div>`;
    return html;
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

    await createMovieList(); // Ensure movieList is populated before using it

    const movie = getMovieById(movieId);
    if (movie) {
        container.innerHTML = renderMovieInfo(movie);// Render movie info
    } 
}

displayMovieInfo();