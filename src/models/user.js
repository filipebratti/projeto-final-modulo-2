const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const User = connection.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

User.associate = (models) => {
  User.hasMany(models.Deposit, {
    foreignKey: "userId",
  });
  User.hasMany(models.Medicine, {
    foreignKey: "userId",
  });
};

module.exports = { User };
