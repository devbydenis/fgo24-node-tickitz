'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Relasi many-to-many dengan Movie
     */
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through: 'movies_genres',
        foreignKey: 'genre_id',
        otherKey: 'movie_id',
        as: 'movies'
      });
    }
  }

  // Definisiin kolom tabel genres
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Nama genre harus unik
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
    tableName: 'genres',
    timestamps: true
  });

  return Genre;
};