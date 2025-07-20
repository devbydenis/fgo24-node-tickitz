'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('movies_genres', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      movie_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "movies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      genre_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "genres",
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
     * await queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('movies_genres');
  }
};
