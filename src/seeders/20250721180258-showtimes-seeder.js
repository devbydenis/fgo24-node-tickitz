'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    
    const dayAfter = new Date(currentDate);
    dayAfter.setDate(currentDate.getDate() + 2);

    await queryInterface.bulkInsert('showtimes', [
      // Theater 1 showtimes
      {
        movie_id: 1, // Pastikan movie dengan id 1 sudah ada
        theater_id: 1,
        show_date: currentDate,
        show_time: '10:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 1,
        theater_id: 1,
        show_date: currentDate,
        show_time: '13:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 2, // Pastikan movie dengan id 2 sudah ada
        theater_id: 1,
        show_date: currentDate,
        show_time: '16:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 2,
        theater_id: 1,
        show_date: currentDate,
        show_time: '19:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Theater 2 showtimes
      {
        movie_id: 1,
        theater_id: 2,
        show_date: tomorrow,
        show_time: '11:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 3, // Pastikan movie dengan id 3 sudah ada
        theater_id: 2,
        show_date: tomorrow,
        show_time: '14:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 3,
        theater_id: 2,
        show_date: tomorrow,
        show_time: '17:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // IMAX Theater showtimes
      {
        movie_id: 2,
        theater_id: 3,
        show_date: dayAfter,
        show_time: '12:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 2,
        theater_id: 3,
        show_date: dayAfter,
        show_time: '15:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        movie_id: 2,
        theater_id: 3,
        show_date: dayAfter,
        show_time: '18:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('showtimes', null, {});
  }
};
