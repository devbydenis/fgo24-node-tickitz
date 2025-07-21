'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('directors', [
      { name: 'Frank Darabont', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Francis Ford Coppola', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Christopher Nolan', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('directors', null, {});
  }
};