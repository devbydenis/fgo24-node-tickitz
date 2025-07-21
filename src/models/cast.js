'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * relasi many-to-many dengan movie
     */
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through: 'movies_casts',
        foreignKey: 'cast_id',
        otherKey: 'movie_id',
        as: 'movies'
      });
    }
  }

  // definisiin kolom tabel casts
  Cast.init({
    actor_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    character_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Cast',
    tableName: 'casts',
    timestamps: true
  });

  return Cast;
};