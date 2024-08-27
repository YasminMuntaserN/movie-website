import { Movie } from "../entities/movie.js";

export let movieList = [];

const apiKey = 'a77c97c81d49467ec6bb4eda3c5bf7e8';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

// Fetch the list of movies
async function fetchMovies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
}

//create Movie List
export async function createMovieList() {
    const moviesData = await fetchMovies(); // Fetch the list of movies
    movieList = [];

    for (const movieData of moviesData) {
        // Classify movie types
        let movieType = getMovieType(movieData.genre_ids);

        // Format the release date to exclude timezone
        let releaseDate = new Date(movieData.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });

        // Generate a random showTime
        let showTime = generateShowTime();

        let movie = new Movie(
            movieData.id,
            movieData.title,
            `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,  // Poster image
            `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`, // Backdrop image
            releaseDate,
            movieData.vote_average,
            movieData.overview,
            movieType,
            showTime
        );

        movieList.push(movie);
    }

    return movieList;
}

// Generate a fixed show time within a range of +/- 7 days from today
function generateShowTime() {
    const now = new Date();
    
    // Define the fixed offset (e.g., 3 days from now)
    const fixedOffset = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
    
    // Calculate the show time by adding the fixed offset to the current time
    const showTime = new Date(now.getTime() + fixedOffset);
    
    // Format the show time to a readable string
    return showTime.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Classify movie types
function getMovieType(genreIds) {
    if (genreIds.includes(28)) return "Action";
    if (genreIds.includes(10749)) return "Romantic";
    if (genreIds.includes(878)) return "Science Fiction";
    return "Unknown";
}

//get Movie By Id
export function getMovieById(id) {
    return movieList.find(movie => movie.id == id) || null;
}

