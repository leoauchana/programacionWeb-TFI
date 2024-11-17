const { DataTypes, Model} = require("sequelize");

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
        name:{
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName:{
          type: DataTypes.STRING,
          allowNull: false
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

  static associate = models => {
    this.hasMany(models.Students, {
      foreignKey: 'user_id',
      as: 'students'
    });
  };

};

module.exports = Users;