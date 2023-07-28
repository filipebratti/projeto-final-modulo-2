const DepositServices = require("../services/deposit.services");
const { config } = require("dotenv");
config();

class DepositController {
  async depositList(request, response) {
    const { status } = request.query;

    const deposit = await DepositServices.depositList(status);

    return response.status(deposit.status).json(deposit.data);
  }

  async depositIdList(request, response) {
    const { id } = request.params;

    const deposit = await DepositServices.depositIdList(id);

    return response.status(deposit.status).json(deposit.data);
  }

  async createDeposit(request, response) {
    const {
      userId,
      companyName,
      cnpj,
      fantasyName,
      email,
      phone,
      cellphone,
      cep,
      street,
      number,
      district,
      city,
      state,
      complement,
      latitude,
      longitude,
      status,
    } = request.body;

    const deposit = await DepositServices.createDeposit({
      userId,
      companyName,
      cnpj,
      fantasyName,
      email,
      phone,
      cellphone,
      status,
      cep,
      street,
      number,
      district,
      city,
      state,
      complement,
      latitude,
      longitude,
    });

    return response.status(deposit.status).json(deposit.data);
  }

  async depositUpdate(request, response) {
    const { id } = request.params;
    const {
      fantasyName,
      email,
      phone,
      cellphone,
      cep,
      street,
      number,
      district,
      city,
      state,
      complement,
      latitude,
      longitude,
    } = request.body;

    const deposit = await DepositServices.depositUpdate(id, {
      fantasyName,
      email,
      phone,
      cellphone,
      cep,
      street,
      number,
      district,
      city,
      state,
      complement,
      latitude,
      longitude,
    });

    return response.status(deposit.status).json(deposit.data);
  }

  async depositStatusUpdate(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const deposit = await DepositServices.depositStatusUpdate(id, status);

    return response.status(deposit.status).json(deposit.data);
  }

  async depositDelete(request, response) {
    const { id } = request.params;

    const deposit = await DepositServices.depositDelete(id);

    return response.status(deposit.status).json(deposit.data);
  }
}

module.exports = new DepositController();
