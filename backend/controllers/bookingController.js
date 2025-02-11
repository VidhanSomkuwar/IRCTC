import db from '../models/index.js';
const { Booking, Train, User, sequelize } = db;

// Book a new seat
export const bookSeat = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { trainId } = req.body;
    const userId = req.user.id;

    // Lock the train record for update to prevent overselling
    const train = await Train.findByPk(trainId, {
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!train) {
      await t.rollback();
      return res.status(404).json({ message: 'Train not found' });
    }

    if (train.availableSeats <= 0) {
      await t.rollback();
      return res.status(400).json({ message: 'No seats available' });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      trainId,
      seatNumber: train.totalSeats - train.availableSeats + 1,
      bookingStatus: 'CONFIRMED',
      bookingDate: new Date()
    }, { transaction: t });

    // Update available seats
    train.availableSeats -= 1;
    await train.save({ transaction: t });

    await t.commit();

    // Fetch booking with train details
    const bookingWithDetails = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Train,
          attributes: ['trainNumber', 'source', 'destination', 'departureTime']
        }
      ]
    });

    res.status(201).json({
      message: 'Booking confirmed successfully',
      booking: bookingWithDetails
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ 
      message: 'Error booking seat', 
      error: error.message 
    });
  }
};

// Get booking details
export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: { 
        id: bookingId,
        userId // Ensure user can only access their own bookings
      },
      include: [
        {
          model: Train,
          attributes: ['trainNumber', 'source', 'destination', 'departureTime']
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching booking details', 
      error: error.message 
    });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Train,
          attributes: ['trainNumber', 'source', 'destination', 'departureTime']
        }
      ],
      order: [['bookingDate', 'DESC']]
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user bookings', 
      error: error.message 
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: { 
        id: bookingId,
        userId,
        bookingStatus: 'CONFIRMED'
      },
      transaction: t
    });

    if (!booking) {
      await t.rollback();
      return res.status(404).json({ message: 'Booking not found or already cancelled' });
    }

    // Update booking status
    booking.bookingStatus = 'CANCELLED';
    await booking.save({ transaction: t });

    // Increase available seats
    const train = await Train.findByPk(booking.trainId, {
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    train.availableSeats += 1;
    await train.save({ transaction: t });

    await t.commit();

    res.json({ 
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ 
      message: 'Error cancelling booking', 
      error: error.message 
    });
  }
};