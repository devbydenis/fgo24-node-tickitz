"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("sessions", "new_id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    });

    await queryInterface.removeColumn("sessions", "id");

    await queryInterface.renameColumn("sessions", "new_id", "id");

    await queryInterface.addConstraint('sessions', {
    fields: ['id'],
    type: 'primary key',
    name: 'sessions_pkey'
  });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("sessions", "sessions_pkey");

    await queryInterface.changeColumn("sessions", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    });
  },
};
