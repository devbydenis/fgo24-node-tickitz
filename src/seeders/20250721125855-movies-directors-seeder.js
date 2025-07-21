'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies_directors', [
      { movie_id: 1, director_id: 1, createdAt: new Date(), updatedAt: new Date() }, // Shawshank - Darabont
      { movie_id: 2, director_id: 2, createdAt: new Date(), updatedAt: new Date() }  // Godfather - Coppola
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_directors', null, {});
  }
};