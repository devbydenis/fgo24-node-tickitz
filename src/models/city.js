'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // city bisa punya banyak cinema
      City.hasMany(models.Cinema, {
        foreignKey: 'city_id',
        as: 'cinemas'
      });
    }
  }
  
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
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
    modelName: 'City',
    tableName: 'cities'
  });
  
  return City;
};