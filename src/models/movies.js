'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Method untuk mendefinisikan relasi
     */
    static associate(models) {
      // movie punya banyak cast lewat tabel movies_casts
      this.belongsToMany(models.Cast, {
        through: 'movies_casts',
        foreignKey: 'movie_id',
        otherKey: 'cast_id',
        as: 'casts'
      });

      // movie punya banyak cast lewat tabel movies_genres
      this.belongsToMany(models.Genre, {
        through: 'movies_genres',
        foreignKey: 'movie_id',
        otherKey: 'genre_id',
        as: 'genres'
      });

      // movie punya banyak cast lewqt tabel movies_directors
      this.belongsToMany(models.Director, {
        through: 'movies_directors',
        foreignKey: 'movie_id',
        otherKey: 'director_id',
        as: 'directors'
      });
    }
  }

  // Definisi kolom tabel movies
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255] // Validasi panjang judul
      }
    },
    backdrop_img: DataTypes.STRING,
    poster_img: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    popularity: DataTypes.FLOAT,
    duration: DataTypes.TIME,
    release_date: DataTypes.DATE,
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 10
      }
    },
    status: {
      type: DataTypes.ENUM('now playing', 'coming soon', 'ended'),
      defaultValue: 'coming soon'
    },
    language: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies',
    timestamps: true, // Aktifkan createdAt dan updatedAt
    paranoid: false  // Tidak menggunakan soft delete
  });

  return Movie;
};