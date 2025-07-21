'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //   await queryInterface.bulkInsert('users', [
  //   {
  //     id: 'e8f9b0d0-7d5e-4b4a-9c0b-2c3b4c5d6e7f',
  //     email: 'upin@gmail.com',
  //     password: '123456',
  //     role: 'user',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },
  //   {
  //     id: '3374996c-4cd8-44c5-a7be-3e33f503af77',
  //     email: 'ipin@gmail.com',
  //     password: '123456',
  //     role: 'admin',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },
  //   {
  //     id: 'b60ca442-67e7-4f73-9a74-7be050d8e164',
  //     email: 'jarjit@gmail.com',
  //     password: '123456',
  //     role: 'user',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }
  //   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('users', null, {});
  }
};
