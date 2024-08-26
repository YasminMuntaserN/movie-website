import {movieList ,createMovieList} from "./data/movieData.js";
import { Movie } from "./entities/movie.js";


// Function to render movies
function renderMoviesinHomeSection() {
  let html = '';

    // Shuffle the array to ensure randomness
    const shuffledMovies = movieList.sort(() => 0.5 - Math.random());
    
    // Select the first 5 movies
    const selectedMovies = shuffledMovies.slice(0, 5);

      selectedMovies.forEach((movie) => { 
          html += ` 
          <div class="swiper-slide container">
              <img src="${movie.backdropImage}" alt="${movie.name}">
                <div class="home-text">
                            <span>${movie.type}</span>
                            <h1>${movie.name}</h1>
                            <a href="" class="btn">Book Now</a>
                </div>
                </div>`;
  });

  return html;
}


function renderAllMoviesinSection() {

  let html = '';

    movieList.slice(0, 30).forEach(movie => {
      html+= ` 
     <div class="box">
            <img src="${movie.posterImage}" alt="" />

            <div class="caption">
            <div class="mainInfo">
            <h4>${movie.name}</h4>
            <p> Type : <span>${movie.type}</span></p>
            <p>Prodection Year :  <span>${movie.year} </span></p>
            </div>

            <div class="circular-progress" data-percentage="${Math.round(movie.rating * 10)}">
             <span class="rating">${Math.round(movie.rating * 10)}%</span>
            </div>

              </div>
        </div>`;
  });
  return html;
}


async function displayMoviesInHomeSection() {
  const container = document.querySelector('.js-home-continer');
  if (!container) {
      return;
  }

  await createMovieList(); // Populate the movieList before using it
  container.innerHTML = renderMoviesinHomeSection(); // Render movies
}

async function displayMoviesInMoviesSection() {
  const container = document.querySelector('.imgs-container');
  if (!container) {
      return;
  }

  await createMovieList(); // Populate the movieList before using it
  container.innerHTML = renderAllMoviesinSection(); // Render movies
  setRatingInProgressPar(); // Now set the rating in progress bar after rendering
}

function displayAsSwiper() {
  const swiper = new Swiper('.swiper', {
      loop: false, // Disable loop mode
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      autoplay: {
          delay: 5000, // Autoplay every 5 seconds
          disableOnInteraction: false,
      },
  });
}

function setRatingInProgressPar(){
  document.querySelectorAll('.circular-progress').forEach(function(progressBar) {
      const percentage = progressBar.getAttribute('data-percentage');
      console.log('Setting percentage:', percentage, 'for', progressBar);
      progressBar.style.setProperty('--percentage', percentage);
  });
}

async function main() {
  await displayMoviesInHomeSection(); // Ensure movies are displayed before initializing Swiper
  displayAsSwiper();
  await displayMoviesInMoviesSection(); 
}

main(); 