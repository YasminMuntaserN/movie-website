import {movie} from "../entities/movie.js";
/* 
I will get a set of movies from the TMDB (The Movie Database) API.
*/
const API_KEY = 'a77c97c81d49467ec6bb4eda3c5bf7e8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Function to fetch movies
async function fetchMovies(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();

  // Clear the existing movie list
  movieList = [];

  data.results.forEach(movie => {
      // Create a new Movie instance
      const movie = new Movie(
          movie.id, // id
          movie.title,//name
          `${IMAGE_BASE_URL}${movie.poster_path}`,//image
          new Date(movie.release_date).getFullYear(),//Year of manufacture
          movie.vote_average,// rate
          movie.overview//description
      );

      // Add the movie instance to the list
      movieList.push(movie);
  });
}
