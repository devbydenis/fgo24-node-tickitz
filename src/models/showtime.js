'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    static associate(models) {
      // sebuah showtime hanya bisa jadi bagian dari satu movie (dengan asumsi movie model exists)
      Showtime.belongsTo(models.Movie, {
        foreignKey: 'movie_id',
        as: 'movie'
      });
      
      // sebuah showtime hanya bisa jadi bagian dari satu theater
      Showtime.belongsTo(models.Theater, {
        foreignKey: 'theater_id',
        as: 'theater'
      });
      
      // sebuah showtime bisa punya banyak booking
      Showtime.hasMany(models.Booking, {
        foreignKey: 'showtime_id',
        as: 'bookings'
      });
    }
  }
  
  Showtime.init({
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'id'
      }
    },
    theater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'theaters',
        key: 'id'
      }
    },
    show_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    show_time: {
      type: DataTypes.TIME,
      allowNull: false
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
    modelName: 'Showtime',
    tableName: 'showtimes',
    indexes: [
      {
        fields: ['theater_id', 'show_date', 'show_time'],
        name: 'unique_showtime_per_theater'
      }
    ]
  });
  
  return Showtime;
};