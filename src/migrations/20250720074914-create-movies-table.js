'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      backdrop_img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      poster_img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      popularity: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      duration: {
        allowNull: true,
        type: Sequelize.TIME
      },
      release_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      rating: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      status: {
        allowNull: true,
        type: Sequelize.ENUM('now playing', 'coming soon', 'ended')
      },
      language: {
        allowNull: true,
        type: Sequelize.STRING
      },
      price: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('movies');
  }
};
