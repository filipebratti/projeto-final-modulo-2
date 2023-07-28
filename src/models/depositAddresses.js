const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const DepositAddresses = connection.define("deposit_addresses", {
  depositId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = { DepositAddresses };
