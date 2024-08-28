import {getMovieById ,createMovieList} from "./data/movieData.js";
import {bookMovie} from "./entities/Booking.js";
import { attachSearchListener } from './search.js';

 // Check if the showtime has not run out
function isShowTimeValid(movie){
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const currentTime = new Date().toLocaleDateString('en-US', options);

    const showTime = new Date(movie.showTime).toLocaleDateString('en-US', options);;
    console.log("Current Time:", currentTime);
    console.log("Movie Show Time:", showTime);
    return  currentTime < showTime;
}

// Function to render movies with conditional payment method input
function renderMovieInfo(movie) {
    return `
        <div class="movie-info" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${movie.backdropImage}');
            background-size: cover;
            background-position: center; 
            background-repeat: no-repeat;">
            
            <div class="imgs-container">
                <img src="${movie.posterImage}" alt="${movie.name}">
            </div>

            <div class="details">
                <div>Rating: <span>${movie.rating}</span></div>
                <div>Production Show Time: <span>${movie.prodectionDate}</span></div>
                <div>Price: <span>$5</span></div>

                
                ${isShowTimeValid(movie) ? `
                <div class="payment-method">
                    <label for="payment">Select Payment Method:</label>
                    <select id="payment">
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Cash">Cash</option>
                    </select>
                    <button class="btn-BookNow" data-id="${movie.id}">Book Now</button>
                </div>
                ` : `
                <div class="showtime-expired">Showtime has passed, booking unavailable.</div>
                `}

            </div>

            <div class="info">
                <h1 class="film-title">${movie.name}</h1>
                <p class="description">${movie.story}</p>
            </div>
        </div>`;
}

// Function to display movie info in the Movie Info section
async function displayMovieInfo() {
    const container = document.querySelector('.container');
    if (!container) {
        return;
    }

    // Extract movie ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
        return;
    }

    // Ensure movieList is populated before using it
    await createMovieList();

    // Get the movie object by ID
    const movie = getMovieById(movieId);
    console.log(movieId);
    if (movie) {
        container.innerHTML = renderMovieInfo(movie); // Render movie info
    } else {
        console.log(movie);
    }
    addEventListenersToBooking();
}

// Function to add event listeners to the Booking button
function addEventListenersToBooking() {
    const btn = document.querySelector('.btn-BookNow'); // Select the button correctly
    if (btn) {  // Ensure the button exists
        const movieId = btn.getAttribute('data-id');
        btn.addEventListener('click', () => openBooking(movieId)); // Add the event listener directly to the button
    } else {
        console.error("Booking button not found");
    }
}

function getPaymentMethod(){
    const paymentMethodSelect = document.getElementById('payment');
        const selectedPaymentMethod = paymentMethodSelect.value;

        return selectedPaymentMethod;
}

// Function to handle booking action and redirect to Booking page
function openBooking(movieId) {
    const selectedPaymentMethod = getPaymentMethod();

    // Proceed with booking logic
    const bookingId = bookMovie(movieId, selectedPaymentMethod);

    // Redirect to the Booking page with the movie ID and booking ID in the query string
    if (bookingId) {
        const url = `Booking.html?id=${movieId}&bookingId=${bookingId}`;
        window.location.href = url;
    } else {
        alert('Booking failed. Please try again.');
    }
}

function main() {
attachSearchListener();
displayMovieInfo();
}
main();