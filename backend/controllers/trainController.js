import db from '../models/index.js';
import { Op } from 'sequelize';  // Add this import

const { Train } = db;

// Add train (admin only)
export const addTrain = async (req, res) => {
  try {
    const { trainNumber, source, destination, totalSeats, departureTime } = req.body;
    
    const train = await Train.create({
      trainNumber,
      source,
      destination,
      totalSeats,
      availableSeats: totalSeats, // Initially all seats are available
      departureTime
    });

    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error adding train', error: error.message });
  }
};

// Get available trains
export const getAvailableTrains = async (req, res) => {
  try {
    const { source, destination, date } = req.query;
    
    const whereClause = {
      availableSeats: {
        [Op.gt]: 0  // Greater than 0
      }
    };

    // Add source and destination to search if provided
    if (source) whereClause.source = source;
    if (destination) whereClause.destination = destination;
    if (date) {
      whereClause.departureTime = {
        [Op.gte]: new Date(date)
      };
    }

    const trains = await Train.findAll({
      where: whereClause,
      order: [['departureTime', 'ASC']]
    });

    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trains', error: error.message });
  }
};

// Update seats (admin only)
export const updateSeats = async (req, res) => {
  try {
    const { trainId } = req.params;
    const { availableSeats } = req.body;

    const train = await Train.findByPk(trainId);
    
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    if (availableSeats > train.totalSeats) {
      return res.status(400).json({ 
        message: 'Available seats cannot exceed total seats' 
      });
    }

    train.availableSeats = availableSeats;
    await train.save();

    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error updating seats', error: error.message });
  }
};