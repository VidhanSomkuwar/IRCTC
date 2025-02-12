import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import UserModel from './User.js';
import TrainModel from './Train.js';
import BookingModel from './Booking.js';

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = UserModel(sequelize);
db.Train = TrainModel(sequelize);
db.Booking = BookingModel(sequelize);


db.User.hasMany(db.Booking);
db.Booking.belongsTo(db.User, {
  foreignKey: 'userId',  
  allowNull: false
});

db.Train.hasMany(db.Booking);
db.Booking.belongsTo(db.Train, {
  foreignKey: 'trainId',  
  allowNull: false
});

export default db;