export class Booking {
  bookingId=1000;
  static seatCounter = 50;  // Start seat numbers from 50
  static bookings = [];  // To keep track of all bookings

  constructor(bookingId, movie, bookingDate, price, paymentMethod) {
    this.bookingId = bookingId;
    this.movie = movie;  // Instance of the Movie class
    this.bookingDate = bookingDate;
    this.seatNumber = Booking.seatCounter++;  // Auto-increment seat number
    this.price = price;
    this.paymentMethod = this.validatePaymentMethod(paymentMethod);  // Ensure valid payment method
  }

  // Method to validate payment method
  validatePaymentMethod(paymentMethod) {
    const validMethods = ['Credit Card', 'PayPal', 'Apple Pay'];
    if (validMethods.includes(paymentMethod)) {
      return paymentMethod;
    } else {
      throw new Error(`Invalid payment method. Valid methods are: ${validMethods.join(', ')}`);
    }
  }

  // Method to add a booking
  static addBooking(movie, bookingDate, paymentMethod) {
    const bookingId = Booking.bookings.length + 1;  // Simple booking ID generation
    const price = Booking.generatePrice(movie.rating);  // Generate price based on movie rating
    const newBooking = new Booking(bookingId, movie, bookingDate, price, paymentMethod);
    Booking.bookings.push(newBooking);  // Add the booking to the list of bookings
    return newBooking;
  }

  // Method to cancel a booking
  static cancelBooking(bookingId) {
    const index = Booking.bookings.findIndex(booking => booking.bookingId === bookingId);
    if (index !== -1) {
      const canceledBooking = Booking.bookings.splice(index, 1)[0];  // Remove the booking from the list
      console.log(`Booking ID ${canceledBooking.bookingId} has been canceled.`);
    } else {
      console.log(`Booking ID ${bookingId} not found.`);
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