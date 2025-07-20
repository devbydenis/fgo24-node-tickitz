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
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      booking_code: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      showtime_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "showtimes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'EXPIRED')
      },
      total_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      discount_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tax_amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      booking_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expired_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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
    await queryInterface.dropTable('bookings');
  }
};
