const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Address = connection.define("addresses", {
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

Address.associate = (models) => {
  Address.belongsToMany(models.Deposit, {
    through: "depositAddresses",
    foreignKey: "addressId",
    otherKey: "depositId",
  });
};

module.exports = { Address };
