"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BahanBaku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BahanBaku.init(
    {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      stok: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "BahanBaku",
    }
  );
  return BahanBaku;
};
