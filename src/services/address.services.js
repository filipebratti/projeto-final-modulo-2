const { Address } = require("../models/address");

const AddressServices = {
  async createAddress(address) {
    if (!address.cep) return { data: "CEP é obrigatório", status: 400 };
    if (!address.street)
      return { data: "Logradouro é obrigatório", status: 400 };
    if (!address.number) return { data: "Número é obrigatório", status: 400 };
    if (!address.district) return { data: "Bairro é obrigatório", status: 400 };
    if (!address.city) return { data: "Cidade é obrigatório", status: 400 };
    if (!address.state) return { data: "Estado é obrigatório", status: 400 };

    const addressCreated = await Address.create(address);

    return { data: addressCreated, status: 201 };
  },
};

module.exports = AddressServices;
