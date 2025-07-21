'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movies', [
      {
        title: 'The Shawshank Redemption',
        backdrop_img: 'shawshank_backdrop.jpg',
        poster_img: 'shawshank_poster.jpg',
        synopsis: 'Two imprisoned men bond over a number of years...',
        popularity: 9.3,
        duration: '02:22:00',
        release_date: new Date('1994-09-23'),
        rating: 9.3,
        status: 'now playing',
        language: 'English',
        price: 50000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Godfather',
        backdrop_img: 'godfather_backdrop.jpg',
        poster_img: 'godfather_poster.jpg',
        synopsis: 'The aging patriarch of an organized crime dynasty...',
        popularity: 9.2,
        duration: '02:55:00',
        release_date: new Date('1972-03-24'),
        rating: 9.2,
        status: 'now playing',
        language: 'English',
        price: 45000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  }
};