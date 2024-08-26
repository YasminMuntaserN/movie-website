import {getMovieById ,createMovieList} from "./data/movieData.js";


// Function to render movies
function renderMovieInfo(movie) {
  return ` 
      <div class="movie-info" style="background-image: url('${movie.backdropImage}')">
            <div class="imgs-container" >
                  <img src="${movie.backdropImage}">
            </div>

            <div class="details">
                  <div>Rating : <span>${movie.rating}</span></div>
                  <div>Time:<span>${movie.runtime}</span></div>
                  <div>prduction Year:<span>${movie.prodectionDate}</span></div>
                  <div>price:<span>5$</span></div>
            </div>

            <div class ="Info">
                  <h1 class="film-title">${movie.name}</h1>
                  <p class="description">${movie.story}</p>
            </div>
      </div>`;
  return html;
}

async function displayMovieInfo() {
  const container = document.querySelector('.container');
  if (!container) {
      return;
  }
  
  await createMovieList(); // Populate the movieList before using it
  let movie =getMovieById(533535);
  console.log(movie);
  container.innerHTML = renderMovieInfo(movie); // Render movie Info
}

displayMovieInfo();