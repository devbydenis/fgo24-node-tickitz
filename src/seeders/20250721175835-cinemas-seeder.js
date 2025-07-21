'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cinemas', [
      {
        city_id: 1, // Jakarta
        name: 'CGV Grand Indonesia',
        address: 'Jl. MH Thamrin No. 1, Jakarta Pusat',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: 1, // Jakarta
        name: 'XXI Plaza Indonesia',
        address: 'Jl. MH Thamrin Kav. 28-30, Jakarta Pusat',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: 2, // Surabaya
        name: 'CGV Tunjungan Plaza',
        address: 'Jl. Basuki Rahmat No. 8-12, Surabaya',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: 3, // Bandung
        name: 'XXI Paris Van Java',
        address: 'Jl. Sukajadi No. 131-139, Bandung',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city_id: 4, // Medan
        name: 'CGV Sun Plaza',
        address: 'Jl. KL Yos Sudarso No. 18, Medan',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cinemas', null, {});
  }
};