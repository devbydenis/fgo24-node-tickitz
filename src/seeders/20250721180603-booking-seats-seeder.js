'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('booking_seats', [
      // Booking 1 - 2 seats
      {
        booking_id: 1,
        seat_id: 1, // Theater 1, seat A1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        booking_id: 1,
        seat_id: 2, // Theater 1, seat A2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Booking 2 - 1 seat
      {
        booking_id: 2,
        seat_id: 3, // Theater 1, seat A3
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Booking 3 - 3 seats
      {
        booking_id: 3,
        seat_id: 4, // Theater 1, seat A4
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        booking_id: 3,
        seat_id: 5, // Theater 1, seat A5
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        booking_id: 3,
        seat_id: 6, // Theater 1, seat A6
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('booking_seats', null, {});
  }
};
