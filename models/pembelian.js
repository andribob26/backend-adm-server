"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pembelian.hasMany(models.DetailPembelian, {
        foreignKey: "idPembelian",
        as: "detailPembelian",
      });
    }
  }
  Pembelian.init(
    {
      no: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pemasok: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      alamat: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // idListBahanBaku: {
      //   allowNull: false,
      //   type: DataTypes.UUID,
      // },
      totalHarga: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Pembelian",
    }
  );
  return Pembelian;
};
