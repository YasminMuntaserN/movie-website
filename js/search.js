import {getMovieByName,  createMovieList } from "./data/movieData.js";

// Function to handle search when the button is clicked or Enter is pressed
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

// Attach event listeners manually
export function attachSearchListener() {
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar');

    if (searchButton && searchInput) {
        // Handle search button click
        searchButton.addEventListener('click', handleSearch);

        // Handle Enter key press in the input field
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleSearch(event);
            }
        });
    } else {
        console.error("Search elements not found");
    }
}

