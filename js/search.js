import { getMovieById, createMovieList, getMovieByName } from "./data/movieData.js";

// Function to handle search
async function handleSearch(event) {
    event.preventDefault();

    const searchInput = document.querySelector('.search-bar').value.trim();

    if (!searchInput) {
        alert('Please enter a movie name.');
        return;
    }

    // Ensure movieList is populated before using it
    await createMovieList();

    // Get the movie by name
    const movie = getMovieByName(searchInput);

    if (movie) {
        // Redirect to the movie's detail page with the movie ID in the query string
        window.location.href = `movieInfo.html?id=${movie.id}`;
    } else {
        alert('Movie not found.');
    }
}

// Function to attach search event listener
function attachSearchListener() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    } else {
        console.error("Search form not found");
    }
}


