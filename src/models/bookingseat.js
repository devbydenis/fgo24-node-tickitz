'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookingSeat extends Model {
    static associate(models) {
      
    }
  }
  
  BookingSeat.init({
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    seat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seats',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BookingSeat',
    tableName: 'booking_seats',
    indexes: [
      {
        unique: true,
        fields: ['booking_id', 'seat_id'],
        name: 'unique_seat_per_booking'
      }
    ]
  });
  
  return BookingSeat;
};