export class BookingData {
    constructor() {
        this.storageKey = 'bookings';
        this.bookings = this.getBookingsFromStorage();  // Initialize the bookings array from local storage
    }

    // Retrieve bookings from local storage
    getBookingsFromStorage() {
        const storedBookings = localStorage.getItem(this.storageKey);
        return storedBookings ? JSON.parse(storedBookings) : [];
    }

    // Save bookings to local storage
    saveBookingsToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.bookings));
    }

    // Add a booking to the storage
    addBooking(booking) {
        this.bookings.push(booking);
        this.saveBookingsToStorage();  // Update local storage
    }

    // Remove a booking from storage
    cancelBooking(bookingId) {
        this.bookings = this.bookings.filter(booking => booking.bookingId !== bookingId);
        this.saveBookingsToStorage();  // Update local storage
    }

    // Retrieve all bookings
    getAllBookings() {
        return this.bookings;
    }

    // Get booking by ID
    getBookingById(id) {
        return this.bookings.find(booking => booking.bookingId === id) || null;
    }
}