'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    static associate(models) {
      // A cinema belongs to a city
      Cinema.belongsTo(models.City, {
        foreignKey: 'city_id',
        as: 'city'
      });
      
      // cinema bisa punya banyak theater
      Cinema.hasMany(models.Theater, {
        foreignKey: 'cinema_id',
        as: 'theaters'
      });
    }
  }
  
  Cinema.init({
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    modelName: 'Cinema',
    tableName: 'cinemas'
  });
  
  return Cinema;
};