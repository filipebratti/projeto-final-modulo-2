const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Medicine = connection.define("medicines", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  depositId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  laboratory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dosage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dosageUnit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

Medicine.associate = (models) => {
  Medicine.belongsTo(models.User);
  Medicine.belongsTo(models.Deposit);
};

module.exports = { Medicine };
