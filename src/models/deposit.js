const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Deposit = connection.define("deposits", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fantasyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cellphone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

Deposit.associate = (models) => {
  Deposit.belongsTo(models.User);
  Deposit.belongsToMany(models.Address, {
    through: "depositAddresses",
    foreignKey: "depositId",
    otherKey: "addressId",
  });
};

module.exports = { Deposit };
