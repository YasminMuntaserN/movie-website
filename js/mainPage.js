import {movieList ,createMovieList} from "./data/movieData.js";


// Function to render movies
function renderMoviesinHomeSection() {

    let html = '';

    // Filter and sort movies by year, then take the first five
    const newMovies = movieList
        .filter(movie => movie.year > 2022 )
        .sort((a, b) => b.year - a.year)
        .slice(0, 10); // Get only the first five movies

   newMovies.forEach(movie => {
    html+= ` 
      <div class="swiper-slide container ">

          <img src="${movie.image}" >
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

  // Filter and sort movies by year, then take the first five
  const newMovies = movieList
      .filter(movie => movie.year > 2022 )
      .sort((a, b) => b.year - a.year)
      .slice(0, 10); // Get only the first five movies

 newMovies.forEach(movie => {
  html+= ` 
    <div class="swiper-slide container ">

        <img src="${movie.image}" >
        <div class="home-text">
            <span>${movie.type}</span>
            <h1>${movie.name}</h1>
            <a href="" class="btn">Book Now</a>
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

async function main() {
  await displayMoviesInHomeSection(); // Ensure movies are displayed before initializing Swiper
  displayAsSwiper();
}

main(); 