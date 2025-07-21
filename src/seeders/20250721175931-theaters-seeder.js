'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('theaters', [
      // CGV Grand Indonesia (cinema_id: 1)
      {
        cinema_id: 1,
        name: 'Studio 1',
        capacity: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cinema_id: 1,
        name: 'Studio 2',
        capacity: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cinema_id: 1,
        name: 'IMAX Studio',
        capacity: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // XXI Plaza Indonesia (cinema_id: 2)
      {
        cinema_id: 2,
        name: 'Theater A',
        capacity: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cinema_id: 2,
        name: 'Theater B',
        capacity: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // CGV Tunjungan Plaza (cinema_id: 3)
      {
        cinema_id: 3,
        name: 'Studio 1',
        capacity: 110,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cinema_id: 3,
        name: 'Studio 2',
        capacity: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // XXI Paris Van Java (cinema_id: 4)
      {
        cinema_id: 4,
        name: 'Cinema 1',
        capacity: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('theaters', null, {});
  }
};