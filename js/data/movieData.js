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
    return data.results;
}

// Fetch and display most-watched movies (popular movies)
fetchMovies('/movie/popular').then(movies => {
    renderMovies(movies.slice(0, 4), 'most-watched');
});

// Fetch and display all movies (you can customize the endpoint to get different lists)
fetchMovies('/movie/now_playing').then(movies => {
    renderMovies(movies, 'all-movies');
});

// Fetch and display newest films (sorted by release date)
fetchMovies('/movie/now_playing').then(movies => {
    movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    renderMovies(movies.slice(0, 4), 'newest-movies');
});
