"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailPengirimans", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        type: Sequelize.UUID,
      },
      idPengiriman: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Pengirimans",
          key: "id",
        },
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      harga: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subTotal: {
        allowNull: false,
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
    await queryInterface.dropTable("DetailPengirimans");
  },
};
