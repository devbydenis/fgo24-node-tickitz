'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      // sebuah seat hanya bisa jadi bagian dari satu theater
      Seat.belongsTo(models.Theater, {
        foreignKey: 'theater_id',
        as: 'theater'
      });
      
      // sebuah seat bisa jadi bagian dari banyak booking (lewat booking_seats)
      Seat.belongsToMany(models.Booking, {
        through: models.BookingSeat,
        foreignKey: 'seat_id',
        otherKey: 'booking_id',
        as: 'bookings'
      });
    }
  }
  
  Seat.init({
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'theaters',
        key: 'id'
      }
    },
    seat_letter: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }// A seat belongs to a theater
  }, {
    sequelize,
    modelName: 'Seat',
    tableName: 'seats',
    indexes: [
      {
        unique: true,
        fields: ['theater_id', 'seat_letter', 'seat_number'],
        name: 'unique_seat_per_theater'
      }
    ]
  });
  
  return Seat;
};