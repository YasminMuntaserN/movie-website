import { BookingData } from '../data/BookingData.js';
import {getMovieById } from "../data/movieData.js";


export class Booking {
    static seatCounter = 50;  // Start seat numbers from 50
    bookingId;
    movie;
    bookingDate;
    seatNumber;
    price;
    paymentMethod;

    constructor(bookingId,movie, price, paymentMethod) {
      this.bookingId = bookingId;  // Generate a unique booking ID using GUID
      this.movie = movie;  // Instance of the Movie class
      this.bookingDate =new Date();
      this.seatNumber = Booking.seatCounter++;  // Auto-increment seat number
      this.price = price;
      this.paymentMethod = this.validatePaymentMethod(paymentMethod);  // Ensure valid payment method
  }

  // Method to validate payment method
  validatePaymentMethod(paymentMethod) {
      const validMethods = ['Credit Card', 'PayPal', 'cash'];
      if (validMethods.includes(paymentMethod)) {
          return paymentMethod;
      } else {
          throw new Error(`Invalid payment method. Valid methods are: ${validMethods.join(', ')}`);
      }
  }

  // Method to generate price based on movie rating
  static generatePrice(rating) {
      if (rating >= 8) {
          return 15.00;  // Higher price for highly rated movies
      } else if (rating >= 5) {
          return 10.00;  // Mid-range price
      } else {
          return 7.50;   // Lower price for less popular movies
      }
  }
}

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}


export function bookMovie(movieId, paymentMethod) {
  const bookingData = new BookingData();
  // Create an instance of BookingData
    let bookingId ='';
    const movie = getMovieById(movieId);
    if (movie) {
       // Generate a unique booking ID (GUID or similar)
        bookingId = generateGUID(); // Ensure you have a function to generate unique IDs

        const price = Booking.generatePrice(movie.rating);
        
        const newBooking = new Booking(
          bookingId,
          movie, price, paymentMethod);
        
        bookingData.addBooking(newBooking);  // Add the booking using bookingData instance
        console.log('New Booking Created:', newBooking);
    } else {
        console.log('Movie not found.');
    }

    return bookingId;
}

//   //get Booking By Id
// export function getBookingById(id) {
//   const bookingData = new BookingData();
//       return bookingData.bookings.find(book => book.id == id) || null;
//   }