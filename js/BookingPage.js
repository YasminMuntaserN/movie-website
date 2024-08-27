import {getMovieById ,createMovieList} from "./data/movieData.js";

// Function to render movie info in Booking page
function renderBookingInfo(movie) {
  return `
        <div class="movie-info">
            <img src="${movie.posterImage}"  class="movie-image">
            <h1 class="movie-title">${movie.name}</h1>
            <p class="movie-rating">Rating :  ${movie.rating}</p>
            <p class="movie-year">Year :      ${movie.prodectionDate}</p>
        </div>
      `;
  return html;
}

async function displayMovieInfoInMovieInfoBox() {
  const container = document.querySelector('.movie-info-container');
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
      container.innerHTML = renderBookingInfo(movie); // Render movie info
  } else {
      console.log(movie); 
  }
}

displayMovieInfoInMovieInfoBox();