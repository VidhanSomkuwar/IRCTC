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
    
    defaultScope: {
      attributes: {
        exclude: ['UserId', 'TrainId']
      }
    }
  });
};

export default Booking;