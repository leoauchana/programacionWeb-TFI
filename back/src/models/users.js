const { DataTypes, Model } = require("sequelize");
const bcrypt = require ("bcrypt");

class Users extends Model {
  static init = (sequelize) => {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [3, 50],
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8, 100],
            notEmpty: true,
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        modelName: "users",
        timestamps: true,
      }
    );

    return this;
  };
}

module.exports = Users;
