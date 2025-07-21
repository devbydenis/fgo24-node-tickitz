'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('casts', [
      { 
        actor_name: 'Tim Robbins', 
        character_name: 'Andy Dufresne',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        actor_name: 'Morgan Freeman', 
        character_name: 'Ellis Boyd "Red" Redding',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        actor_name: 'Marlon Brando', 
        character_name: 'Don Vito Corleone',
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('casts', null, {});
  }
};