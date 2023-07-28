"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: { msg: "CPF já existe" },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: { msg: "Email Invalido" },
        },
        unique: { msg: "Email já existe" },
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          min: { args: 8, msg: "Senha deve ter no mínimo 8 caracteres" },
          is: {
            args: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
            msg: "Senha deve conter ao menos uma letra maiúscula, um número e um caractere especial",
          },
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
