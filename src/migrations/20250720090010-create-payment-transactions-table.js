'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('payment_transactions', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('payment_transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      booking_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "bookings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      payment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "payments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'success', 'failed', 'refunded')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      completedAt: {
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
     * await queryInterface.dropTable('payment_transactions');
    */
    await queryInterface.dropTable('payment_transactions');
  }
};
