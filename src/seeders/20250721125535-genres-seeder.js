'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('genres', [
      { name: 'Drama', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Crime', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Action', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Adventure', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  }
};