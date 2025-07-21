'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies_casts', [
      { movie_id: 1, cast_id: 1, createdAt: new Date(), updatedAt: new Date() }, // Shawshank - Tim Robbins
      { movie_id: 1, cast_id: 2, createdAt: new Date(), updatedAt: new Date() }, // Shawshank - Morgan Freeman
      { movie_id: 2, cast_id: 3, createdAt: new Date(), updatedAt: new Date() }  // Godfather - Marlon Brando
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_casts', null, {});
  }
};