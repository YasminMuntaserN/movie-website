import { movieList, createMovieList } from "./data/movieData.js";

// Function to open movie info html page 
function openMovieInfo(movieId) {
  const url = `movieInfo.html?id=${movieId}`;
  window.location.href = url;
}

// Function to render movies in the home section
function renderMoviesinHomeSection() {
  let html = '';
    // to get random movies for every thime the method called
  const shuffledMovies = movieList.sort(() => 0.5 - Math.random());
  const selectedMovies = shuffledMovies.slice(0, 5);

  selectedMovies.forEach((movie) => {
    html += ` 
    <div class="swiper-slide container" data-id="${movie.id}">
        <img src="${movie.backdropImage}" alt="${movie.name}">
        <div class="home-text">
          <span>${movie.type}</span>
          <h1>${movie.name}</h1>
          <a class="btn">Book Now</a>
        </div>
    </div>`;
  });

  return html;
}

// Function to render all movies in the section
function renderAllMoviesinSection() {
  let html = '';

  movieList.slice(0, 30).forEach(movie => {
    html += ` 
    <div class="box box-${movie.id}" data-id="${movie.id}">
      <img src="${movie.posterImage}" alt="" />
      <div class="caption">
        <div class="mainInfo">
          <h4>${movie.name}</h4>
          <p>Type: <span>${movie.type}</span></p>
          <p>Production Year: <span>${movie.year}</span></p>
        </div>
        <div class="circular-progress" data-percentage="${Math.round(movie.rating * 10)}">
          <span class="rating">${Math.round(movie.rating * 10)}%</span>
        </div>
      </div>
    </div>`;
  });

  return html;
}

// Function to display movies in the home section
async function displayMoviesInHomeSection() {
  const container = document.querySelector('.js-home-continer');
  if (!container) return;

  await createMovieList();
  container.innerHTML = renderMoviesinHomeSection();
  addEventListenersToHomeSection();
}

// Function to display movies in the movies section
async function displayMoviesInMoviesSection() {
  const container = document.querySelector('.imgs-container');
  if (!container) return;

  await createMovieList();
  container.innerHTML = renderAllMoviesinSection();
  setRatingInProgressPar();
  addEventListenersToDisplayMovies();
}
// Function to add event listeners to display movies section when click on spesific movie it will go to movie Info page 
function addEventListenersToDisplayMovie() {
  document.querySelectorAll('.box').forEach(box => {
    const movieId = box.getAttribute('data-id');
    // Attach the event listener directly to the box element
    box.addEventListener('click', () => openMovieInfo(movieId));
  });
}

// Function to add event listeners to the home sectionwhen click on book btn it will go to movie Info page 
function addEventListenersToHomeSection() {
  document.querySelectorAll('.swiper-slide').forEach(slide => {
    const movieId = slide.getAttribute('data-id');
    slide.querySelector('.btn').addEventListener('click', () => openMovieInfo(movieId));
  });
}

// Function to set rating in progress bar
function setRatingInProgressPar() {
  document.querySelectorAll('.circular-progress').forEach(function(progressBar) {
    const percentage = progressBar.getAttribute('data-percentage');
    progressBar.style.setProperty('--percentage', percentage);
  });
}

// Function to initialize Swiper
function displayAsSwiper() {
  const swiper = new Swiper('.swiper', {
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

// Main function to run on page load
async function main() {
  await displayMoviesInHomeSection();
  displayAsSwiper();
  await displayMoviesInMoviesSection();
}
main();