import {Movie} from "../entities/movie.js";

export let movieList =[];

/* 
I will get a set of movies from the TMDB (The Movie Database) API.
*/
const apiKey = 'a77c97c81d49467ec6bb4eda3c5bf7e8';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

async function fetchMovies() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.results;
}

async function createMovieList() {
  const moviesData = await fetchMovies();
  const moviesList = [];

  moviesData.forEach(movieData => {
      // Example to classify movie types, could be based on genres or other logic
      let movieType = getMovieType(movieData.genre_ids);
      let movie = new Movie(
          movieData.id,
          movieData.title,
          `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
          movieData.release_date.split("-")[0],
          movieData.vote_average,
          movieData.overview,
          movieType
      );
      moviesList.push(movie);
  });

  // Now you have a list of movie objects
  console.log(moviesList);
  return moviesList;
}

function getMovieType(genreIds) {
  // Example logic to determine movie type based on genre IDs
  if (genreIds.includes(28)) return "Action";
  if (genreIds.includes(10749)) return "Romantic";
  if (genreIds.includes(878)) return "Science Fiction";
  // Add more logic for other types or specific collections like Marvel Universe
  return "Unknown";
}

movieList = createMovieList();