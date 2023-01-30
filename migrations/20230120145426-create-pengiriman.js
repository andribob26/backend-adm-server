"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pengirimans", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        type: Sequelize.UUID,
      },
      no: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pembeli: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      noPolisi: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalHarga: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pengirimans");
  },
};
