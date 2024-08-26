import { Movie } from "../entities/movie.js";

export let movieList =[];

const apiKey = 'a77c97c81d49467ec6bb4eda3c5bf7e8';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

async function fetchMovies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
}

export async function createMovieList() {
    const moviesData = await fetchMovies();
     movieList=[];
    moviesData.forEach(movieData => {
      // Example to classify movie types, could be based on genres or other logic
      let movieType = getMovieType(movieData.genre_ids);
      let movie = new Movie(
          movieData.id,
          movieData.title,
       `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
       new Date(movieData.release_date),
          movieData.vote_average,
          movieData.overview,
          movieType
      );
      movieList.push(movie);
  }); // Check the movies being fetched and created
  return movieList;
}

function getMovieType(genreIds) {
    if (genreIds.includes(28)) return "Action";
    if (genreIds.includes(10749)) return "Romantic";
    if (genreIds.includes(878)) return "Science Fiction";
    return "Unknown";
}


