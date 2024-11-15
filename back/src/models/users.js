import { DataTypes, Model, Sequelize } from "sequelize";

class Users extends Model {
  static init = (sequelize) => {
    super.init(
      {
        id: {
          type: DataTypes.NUMBER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
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
        timestamps: false,
      }
    );
    return this;
  };
}
