'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          msg: 'Username sudah digunakan'
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        set (value) {
          const hash = bcrypt.hashSync(value, 10)
          this.setDataValue('password', hash)
        }
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING
      },
      noHp: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastLogin: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
