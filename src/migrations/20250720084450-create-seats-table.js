'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('seats', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('seats', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      theater_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "theaters",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      seat_letter: {
        allowNull: true,
        type: Sequelize.STRING
      },
      seat_number: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('seats');
    */
    await queryInterface.dropTable('seats');
  }
};
