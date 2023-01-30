"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengiriman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pengiriman.hasMany(models.DetailPengiriman, {
        foreignKey: "idPengiriman",
        as: "detailPengiriman",
      });
    }
  }
  Pengiriman.init(
    {
      no: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pembeli: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      noPolisi: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      totalHarga: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Pengiriman",
    }
  );
  return Pengiriman;
};
