import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
  bookSeat, 
  getBookingDetails, 
  getUserBookings,
  cancelBooking 
} from '../controllers/bookingController.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Book a new seat
router.post('/book-seat', bookSeat);

// Get specific booking details
router.get('/:bookingId', getBookingDetails);

// Get all bookings for logged-in user
router.get('/user/bookings', getUserBookings);

// Cancel a booking
router.put('/:bookingId/cancel', cancelBooking);

export default router;