'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    const completedTime = new Date(currentDate);
    completedTime.setMinutes(currentDate.getMinutes() + 5);

    await queryInterface.bulkInsert('payment_transactions', [
      {
        booking_id: 1,
        payment_id: 3, // GoPay
        amount: 85000,
        status: 'success',
        createdAt: currentDate,
        completedAt: completedTime
      },
      {
        booking_id: 2,
        payment_id: 1, // Bank Transfer BCA
        amount: 45000,
        status: 'pending',
        createdAt: currentDate,
        completedAt: currentDate // Belum completed untuk pending
      },
      {
        booking_id: 3,
        payment_id: 4, // OVO
        amount: 125000,
        status: 'refunded',
        createdAt: currentDate,
        completedAt: completedTime
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_transactions', null, {});
  }
};