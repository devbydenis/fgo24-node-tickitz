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

    await queryInterface.removeColumn('profiles', 'id');

    await queryInterface.addColumn('profiles', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    });

    await queryInterface.changeColumn("profiles", "firstname", {
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "lastname", {
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "birthday", {
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "gender", {
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "profile_picture", {
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "phone_number", {
      allowNull: true,
    });

    await queryInterface.changeColumn("profiles", "is_verified", {
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('profiles', 'id');
    await queryInterface.addColumn('profiles', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    });

    await queryInterface.changeColumn("profiles", "firstname", {
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "lastname", {
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "birthday", {
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "gender", {
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "profile_picture", {
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "phone_number", {
      allowNull: false,
    });

    await queryInterface.changeColumn("profiles", "is_verified", {
      allowNull: false,
    });
  },
};
