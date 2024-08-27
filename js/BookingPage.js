import {getMovieById ,createMovieList} from "./data/movieData.js";
import { BookingData } from './data/BookingData.js';

// Function to render movie info in Booking page
function renderMovieInfo(movie) {
  return `
        <div class="movie-info" style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${movie.backdropImage}');
            background-size: cover;
            background-position: center; 
            background-repeat: no-repeat;">
            <h1 class="movie-title">${movie.name}</h1>
            <p class="movie-rating">Rating :  ${movie.rating}</p>
            <p class="movie-year">Year :      ${movie.prodectionDate}</p>
        </div>
      `;
  return html;
}

// Function to render Booking info in Booking page
function renderBookingInfo(Booking, movie) {
  return `
    <div class="booking-info">
        <h2>Booking Information</h2>
        <p><strong>Booking ID : </strong> ${Booking.bookingId}</p>
        <p><strong>Booking Date : </strong> ${new Date(Booking.bookingDate).toLocaleTimeString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
      })}</p>
        <p><strong>Price : </strong>${Booking.price}</p>
        <p><strong>Payment Method : </strong>${Booking.paymentMethod}</p>
        <p><strong>Show Time : </strong>${movie.showTime}</p>
        <button class="delete-book" booking-id="${Booking.bookingId}">
          Cancel
        </button>
    </div>
  `;
}

// Function to render all content in the Booking page
function renderAllContent(booking, movie) {
  return renderMovieInfo(movie) + renderBookingInfo(booking, movie);
}

// Function to display all bookings
async function displayAllBookings() {
  const container = document.querySelector('.all-booked-movies-container');
  if (!container) {
      console.error('Container not found!');
      return;
  }

  // Ensure movieList is populated before using it
  await createMovieList(); 

  const bookingData = new BookingData();
  const bookings = bookingData.getAllBookings();
  
  let content = '';
  for (const booking of bookings) {
      const movie = getMovieById(booking.movie.id);
      if (movie) {
          content += `<div class="container">${renderAllContent(booking, movie)}</div>`;
      }
  }

  container.innerHTML = content;

  // Attach event listeners after content is rendered
  addClickEventForDeleteItemInCart();
}

// Function to add click event listeners to the delete buttons
  function addClickEventForDeleteItemInCart() {
  const buttons = document.querySelectorAll('.delete-book');
  if (buttons.length === 0) {
    console.error('No delete buttons found!');
    return;
  }

  buttons.forEach((btn) => {
    const bookingId = btn.getAttribute('booking-id');
    console.log(`Attaching event listener to booking ID: ${bookingId}`);

    btn.addEventListener('click', () => {
      const bookingData = new BookingData();
      console.log(`Canceling booking ID: ${bookingId}`);
      bookingData.cancelBooking(bookingId);

      // Re-render the bookings list after deletion
      displayAllBookings();
    });
  });
}

// Main function to initialize the page
function main() {
  displayAllBookings();
}

main();