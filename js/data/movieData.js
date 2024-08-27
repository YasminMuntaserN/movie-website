import { Movie } from "../entities/movie.js";

export let movieList =[];

const apiKey = 'a77c97c81d49467ec6bb4eda3c5bf7e8';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

// Fetch the list of movies
async function fetchMovies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
}

export async function createMovieList() {
    const moviesData = await fetchMovies(); // Fetch the list of movies
    movieList = [];

    for (const movieData of moviesData) {
        // classify movie types
        let movieType = getMovieType(movieData.genre_ids);

        // Format the release date to exclude timezone
        let releaseDate = new Date(movieData.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });

        let movie = new Movie(
            movieData.id,
            movieData.title,
            `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,  // Poster image
            `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`, // Backdrop image
            releaseDate,
            movieData.vote_average,
            movieData.overview,
            movieType
        );

        movieList.push(movie);
    }

    return movieList;
}

// classify movie types
function getMovieType(genreIds) {
    if (genreIds.includes(28)) return "Action";
    if (genreIds.includes(10749)) return "Romantic";
    if (genreIds.includes(878)) return "Science Fiction";
    return "Unknown";
}

export function getMovieById(id) {
    let selectedMovie='';
    movieList.forEach((movie) => { 
    if(movie.id == id){
       // console.log(movie);
        selectedMovie= movie;
    }
    });
return selectedMovie;
}


