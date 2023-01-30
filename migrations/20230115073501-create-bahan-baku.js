"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BahanBakus", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      stok: {
        allowNull: true,
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
    await queryInterface.dropTable("BahanBakus");
  },
};
