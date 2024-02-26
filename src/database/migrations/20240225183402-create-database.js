"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome:{
        type: Sequelize.STRING(100),
        allowNull: false,     
      },
      senha:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};