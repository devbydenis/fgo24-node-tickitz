'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('cinemas', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('cinemas', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "cities",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isActive: {
        allowNull: true,
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
     * await queryInterface.dropTable('cinemas');
    */
    await queryInterface.dropTable('cinemas');
  }
};
