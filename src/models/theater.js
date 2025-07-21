'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {
    static associate(models) {
      // theater punyanya sebuah cinema
      Theater.belongsTo(models.Cinema, {
        foreignKey: 'cinema_id',
        as: 'cinema'
      });
      
      // theater bisa punya banyak seat
      Theater.hasMany(models.Seat, {
        foreignKey: 'theater_id',
        as: 'seats'
      });
      
      // theater bisa punya banyak showtime
      Theater.hasMany(models.Showtime, {
        foreignKey: 'theater_id',
        as: 'showtimes'
      });
    }
  }
  
  Theater.init({
    cinema_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cinemas',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
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
    }
  }, {
    sequelize,
    modelName: 'Theater',
    tableName: 'theaters'
  });
  
  return Theater;
};