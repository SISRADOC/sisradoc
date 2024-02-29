"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Usuario", "nomeUsuario", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "siap", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "campus", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "classeReferencia", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "vinculo", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "regimeTrabalho", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "titulacao", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Usuario", "telefone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('Usuario');
  },
};
