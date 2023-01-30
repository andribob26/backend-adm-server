"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailPembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailPembelian.init(
    {
      idPembelian: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      harga: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      subTotal: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "DetailPembelian",
    }
  );
  return DetailPembelian;
};
