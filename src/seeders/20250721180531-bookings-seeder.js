'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    const expiredTime = new Date(currentDate);
    expiredTime.setMinutes(currentDate.getMinutes() + 15); // 15 menit dari sekarang

    await queryInterface.bulkInsert('bookings', [
      {
        booking_code: 1001,
        user_id: '550e8400-e29b-41d4-a716-446655440001', // UUID contoh - pastikan user ini ada
        showtime_id: 1,
        status: 'CONFIRMED',
        total_price: 85000, // 2 tiket @ 40000 + tax + fee
        discount_amount: 0,
        tax_amount: 5000,
        booking_time: currentDate,
        expired_time: expiredTime,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        booking_code: 1002,
        user_id: '550e8400-e29b-41d4-a716-446655440002', // UUID contoh
        showtime_id: 2,
        status: 'PENDING',
        total_price: 45000, // 1 tiket @ 40000 + tax + fee
        discount_amount: 5000,
        tax_amount: 10000,
        booking_time: currentDate,
        expired_time: expiredTime,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        booking_code: 1003,
        user_id: '550e8400-e29b-41d4-a716-446655440001',
        showtime_id: 3,
        status: 'CANCELLED',
        total_price: 125000, // 3 tiket @ 40000 + tax + fee
        discount_amount: 0,
        tax_amount: 5000,
        booking_time: currentDate,
        expired_time: expiredTime,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', null, {});
  }
};