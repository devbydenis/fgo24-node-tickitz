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
    // await queryInterface.addColumn("users", "new_id", {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    //   allowNull: true,
    // });

    await queryInterface.removeColumn("users", "new_id");

    // await queryInterface.renameColumn("users", "new_id", "id");

    // await queryInterface.addConstraint("users", {
    //   fields: ["id"],
    //   type: "primary key",
    //   name: "users_pkey",
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("users", "users_pkey");

    await queryInterface.changeColumn("users", "id", {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    });
  },
};
