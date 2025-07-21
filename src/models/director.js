'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    /**
     * relasi many-to-many dengan movie
     */
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through: 'movies_directors',
        foreignKey: 'director_id',
        otherKey: 'movie_id',
        as: 'movies'
      });
    }
  }

  // definisiin kolom tabel directors
  Director.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Director',
    tableName: 'directors',
    timestamps: true
  });

  return Director;
};