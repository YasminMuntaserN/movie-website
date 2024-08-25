import {fetchMovies ,movieList} from "./data/movieData.js";

fetchMovies('/movie/popular');

// Function to render movies
function renderMoviesinHomeSection() {

    let html = '';

    movieList.forEach(movie => {
    html+= ` 
      <div class="swiper-slide container ">
          <img src="${movie.image}" >
          <div class="home-text">
              <span>${movie.name}</span>
              <h1>Guardians of the Galaxy <br>Volume 2</h1>
              <a href="" class="btn">Book Now</a>
          </div>
      </div>`;
    });
}
function displayMoviesInHomeSection() {
  const container = document.querySelector('js-home-continer');
  if (!container) {
    return;
  }
  productGridElement.innerHTML = renderMovies();
}