import {movieList ,getMovieById ,createMovieList} from "./data/movieData.js";


// Function to render movies
function renderMovieInfo(movie) {
  let html = '';

    // Shuffle the array to ensure randomness
    const shuffledMovies = movieList.sort(() => 0.5 - Math.random());
    
    // Select the first 5 movies
    const selectedMovies = shuffledMovies.slice(0, 5);

      selectedMovies.forEach((movie) => { 
          html += ` 
      <div class="Movie-Info" style="background-image: url('${movie.backdropImage}')">
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
  });

  return html;
}

async function displayMovieInfo() {
  const container = document.querySelector('.container');
  if (!container) {
      return;
  }
  
  await createMovieList(); // Populate the movieList before using it
  let movie =getMovieById(533535);
  container.innerHTML = renderMovieInfo(movie); // Render movie Info
}

displayMovieInfo();