'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('payments', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      method_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      provider: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fee_process: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
     * await queryInterface.dropTable('payments');
    */
    await queryInterface.dropTable('payments');
  }
};
