import {getMovieById ,createMovieList} from "./data/movieData.js";
import { BookingData } from './data/BookingData.js';

// Function to render movie info in Booking page
function renderMovieInfo(movie) {
  return `
        <div class="movie-info">
            <img src="${movie.posterImage}"  class="movie-image">
            <h1 class="movie-title">${movie.name}</h1>
            <p class="movie-rating">Rating :  ${movie.rating}</p>
            <p class="movie-year">Year :      ${movie.prodectionDate}</p>
        </div>
      `;
  return html;
}

// Function to render Booking info in Booking page
function renderBookingInfo(Booking,movie) {
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
        </div>
      `;
  return html;
}

// Function to render Booking info and movie info in Booking page
function renderAllContent(booking,movie ){
  return  renderMovieInfo(movie)+
  renderBookingInfo(booking,movie);
}

// Extract booking ID from URL parameters
function getBookingIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get('bookingId'));
  return urlParams.get('bookingId');
}

// Extract movie ID from URL parameters
function getMovieIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get('id'));
  return urlParams.get('id');
}

async function displayMovieInfoInMovieInfoBox() {
  const container = document.querySelector('.container');
  if (!container) {
      return;
  }

  const movieId = getMovieIdFromURL();
  const bookingId = getBookingIdFromURL();


  if (!movieId && !bookingId) {
      return;
  }

  // Ensure movieList is populated before using it
  await createMovieList(); 

  // Get the movie object by ID
  const movie = getMovieById(movieId);
  const bookingData = new BookingData();
  const booking =bookingData.getBookingById(bookingId);

  console.log(movieId ,bookingId); 
  if (movie && booking ) {
      container.innerHTML = renderAllContent(booking,movie); // Render movie info
  } else {
      console.log(movie ,booking); 
  }
}

displayMovieInfoInMovieInfoBox();