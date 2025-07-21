'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies_genres', [
      { movie_id: 1, genre_id: 1, createdAt: new Date(), updatedAt: new Date() }, // Shawshank - Drama
      { movie_id: 2, genre_id: 1, createdAt: new Date(), updatedAt: new Date() }, // Godfather - Drama
      { movie_id: 2, genre_id: 2, createdAt: new Date(), updatedAt: new Date() }  // Godfather - Crime
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_genres', null, {});
  }
};