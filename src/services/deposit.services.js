const { User } = require("../models/user");
const { Deposit } = require("../models/deposit");
const { Medicine } = require("../models/medicine");
const AddressServices = require("./address.services");
const DepositAddressesServices = require("../services/depositAddresses.services");

const DepositServices = {
  async depositList(status) {
    if (status !== "true" && status !== "false" && status !== undefined) {
      return { data: "Status inválido", status: 400 };
    }

    let depositoExistente;

    if (status === "true" || status === "false") {
      depositoExistente = await Deposit.findAll({
        where: { status },
      });
    } else {
      depositoExistente = await Deposit.findAll();
    }

    if (!depositoExistente) {
      return { data: "Nenhum Depósito encontrado.", status: 404 };
    }

    return { data: depositoExistente, status: 200 };
  },

  async depositIdList(id) {
    const deposit = await Deposit.findByPk(id);

    if (!deposit) {
      return { data: "Depósito não encontrado.", status: 404 };
    }

    return { data: deposit, status: 200 };
  },

  async createDeposit(deposit) {
    if (!deposit.companyName)
      return { data: "Razão Social é obrigatório", status: 400 };
    if (!deposit.cnpj) return { data: "CNPJ é obrigatório", status: 400 };
    if (!deposit.email) return { data: "E-mail é obrigatório", status: 400 };
    if (!deposit.fantasyName)
      return { data: "Nome Fantasia é obrigatório", status: 400 };
    if (!deposit.cellphone)
      return { data: "Celular é obrigatório", status: 400 };
    if (deposit.status === undefined)
      return { data: "Status é obrigatório", status: 400 };
    if (!deposit.userId)
      return { data: "Identificador de usuário é obrigatório", status: 400 };

    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validateEmail.test(deposit.email)) {
      return { data: "Email inválido", status: 400 };
    }

    const emailExistente = await Deposit.findOne({
      where: { email: deposit.email },
    });

    if (emailExistente) {
      return { data: "Email já existe", status: 409 };
    }

    const usuarioExistente = await User.findByPk(deposit.userId);

    if (!usuarioExistente) {
      return { data: "Usuário não cadastrado.", status: 404 };
    }

    const depositoExistente = await Deposit.findOne({
      where: { cnpj: deposit.cnpj },
    });

    if (depositoExistente) {
      return { data: "CNPJ já cadastrado.", status: 409 };
    }

    const address = await AddressServices.createAddress({
      cep: deposit.cep,
      street: deposit.street,
      number: deposit.number,
      district: deposit.district,
      city: deposit.city,
      state: deposit.state,
      complement: deposit.complement,
      latitude: deposit.latitude,
      longitude: deposit.longitude,
    });

    if (address.status !== 201) {
      return { data: address.data, status: address.status };
    }

    const data = await Deposit.create(deposit);

    await DepositAddressesServices.createDepositAddresses({
      addressId: address.data.id,
      depositId: data.dataValues.id,
    });

    return { data, status: 201 };
  },

  async depositUpdate(id, deposit) {
    const depositoExistente = await Deposit.findByPk(id);

    if (!depositoExistente) {
      return { data: "Depósito não cadastrado.", status: 404 };
    }
    if (!deposit.fantasyName)
      return { data: "Nome Fantasia é obrigatório", status: 400 };
    if (!deposit.email) return { data: "Email é obrigatório", status: 400 };
    if (!deposit.phone) return { data: "Telefone é obrigatório", status: 400 };
    if (!deposit.cellphone)
      return { data: "Celular é obrigatório", status: 400 };

    const address = await AddressServices.createAddress({
      cep: deposit.cep,
      street: deposit.street,
      number: deposit.number,
      district: deposit.district,
      city: deposit.city,
      state: deposit.state,
      complement: deposit.complement,
      latitude: deposit.latitude,
      longitude: deposit.longitude,
    });

    if (address.status !== 201) {
      return { data: address.data, status: address.status };
    }

    const data = await Deposit.update(deposit, { where: { id } });

    await DepositAddressesServices.createDepositAddresses({
      addressId: address.data.id,
      depositId: id,
    });

    return { data, status: 200 };
  },

  async depositStatusUpdate(id, status) {
    const depositoExistente = await Deposit.findByPk(id);

    if (!depositoExistente) {
      return { data: "Depósito não cadastrado.", status: 404 };
    }
    if (status === undefined)
      return { data: "Status é obrigatório", status: 400 };
    if (typeof status !== "boolean") {
      return { data: "Status deve ser booleano", status: 400 };
    }

    const data = await Deposit.update({ status }, { where: { id } });

    return { data, status: 200 };
  },

  async depositDelete(id) {
    const depositoExistente = await Deposit.findByPk(id);

    if (!depositoExistente) {
      return { data: "Depósito não cadastrado.", status: 404 };
    }

    const medicamentos = await Medicine.findOne({ where: { depositId: id } });

    if (medicamentos) {
      return {
        data: "Depósito não pode haver medicamentos vínculados para exclusão.",
        status: 400,
      };
    }
    if (depositoExistente.status === true) {
      return {
        data: "Depósito precisa estar inativo para exclusão.",
        status: 400,
      };
    }

    const data = await Deposit.destroy({ where: { id } });

    return { data, status: 200 };
  },
};

module.exports = DepositServices;
