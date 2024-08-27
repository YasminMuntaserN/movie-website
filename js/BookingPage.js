// Function to render movie info in Booking page
function renderMovieInfo(movie) {
  return `
    <div class="movie-info">
            <img src="${movie.posterImage}" class="movie-image">
            <h1 class="movie-title">${movie.name}</h1>
            <p class="movie-rating">Rating : ${movie.rating}</p>
            <p class="movie-year">Year :     ${movie.prodectionDate}</p>
        </div> 
      `;
  return html;
}