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
    await queryInterface.changeColumn('users', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // auto-generate UUID tapi gabisa huft!!
      allowNull: true,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('users', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    });
  }
};
