const { DepositAddresses } = require("../models/depositAddresses");
const { Address } = require("../models/address");
const { Deposit } = require("../models/deposit");

const depositAddressesServices = {
  async createDepositAddresses(depositAddresses) {
    if (!depositAddresses.addressId)
      return { data: "addressId é obrigatório", status: 400 };
    if (!depositAddresses.depositId)
      return { data: "depositId é obrigatório", status: 400 };

    const address = await Address.findByPk(depositAddresses.addressId);

    if (!address) {
      return { data: "Endereço não cadastrado.", status: 404 };
    }

    const deposit = await Deposit.findByPk(depositAddresses.depositId);

    if (!deposit) {
      return { data: "Depósito não cadastrado.", status: 404 };
    }

    const depositAddressesCreated = await DepositAddresses.create(
      depositAddresses
    );

    return { data: depositAddressesCreated, status: 201 };
  },
};

module.exports = depositAddressesServices;
