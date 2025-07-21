'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payments', [
      {
        method_name: 'Bank Transfer BCA',
        provider: 'BCA',
        fee_process: 2500,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'Bank Transfer Mandiri',
        provider: 'Mandiri',
        fee_process: 2500,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'GoPay',
        provider: 'Gojek',
        fee_process: 1000,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'OVO',
        provider: 'OVO',
        fee_process: 1500,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'DANA',
        provider: 'DANA',
        fee_process: 1000,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'Credit Card Visa',
        provider: 'Visa',
        fee_process: 5000,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        method_name: 'Credit Card Mastercard',
        provider: 'Mastercard',
        fee_process: 5000,
        is_active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payments', null, {});
  }
};