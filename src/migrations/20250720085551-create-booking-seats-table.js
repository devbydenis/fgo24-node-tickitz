'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('booking_seats', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('booking_seats', {
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
      seat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "seats",
          key: "id",
        },
        onDelete: "CASCADE",
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
     * await queryInterface.dropTable('booking_seats');
    */
    await queryInterface.dropTable('booking_seats');
  }
};
