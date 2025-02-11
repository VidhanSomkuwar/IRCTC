import { DataTypes } from 'sequelize';

const Train = (sequelize) => {
  return sequelize.define('Train', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trainNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};

export default Train;