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
    // await queryInterface.bulkInsert('users', [
    // {
    //   id:'9549870f-311f-4688-b095-4c66c77af614',
    //   email: 'tokdalang@gmail.com',
    //   password: '123456',
    //   role: 'user',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   id:'1b27e913-df9d-4ce2-acc5-a69fb2e285e9',
    //   email: 'opah@gmail.com',
    //   password: '123456',
    //   role: 'user',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },
    // {
    //   id:'982ed383-9dff-46ae-b698-66de75f80dd0',
    //   email: 'rembo@gmail.com',
    //   password: '123456',
    //   role: 'user',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }
    // ], {});
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
