'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Jakarta',
        province: 'DKI Jakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Surabaya',
        province: 'Jawa Timur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bandung',
        province: 'Jawa Barat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Medan',
        province: 'Sumatera Utara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yogyakarta',
        province: 'DI Yogyakarta',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};