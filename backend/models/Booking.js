import { DataTypes } from 'sequelize';

const Booking = (sequelize) => {
  return sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookingStatus: {
      type: DataTypes.ENUM('CONFIRMED', 'CANCELLED'),
      defaultValue: 'CONFIRMED'
    },
    bookingDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    // Add this to control which fields are returned
    defaultScope: {
      attributes: {
        exclude: ['UserId', 'TrainId'] // Exclude the capitalized versions
      }
    }
  });
};

export default Booking;