const UserServices = require("../services/user.services");
const { config } = require("dotenv");
config();

class UserController {
  async getUser(request, response) {
    const { id } = request.params;

    const user = await UserServices.getUser(id);

    return response.status(user.status).json(user.data);
  }

  async createOneUser(request, response) {
    const { name, lastName, gender, cpf, phone, email, password, status } =
      request.body;

    const user = await UserServices.createUser({
      name,
      lastName,
      gender,
      cpf,
      phone,
      email,
      password,
      status,
    });

    return response.status(user.status).json(user.data);
  }

  async loginUser(request, response) {
    const { email, password } = request.body;

    const user = await UserServices.loginUser({ email, password });

    return response.status(user.status).json(user.data);
  }

  async updateUser(request, response) {
    const { id } = request.params;
    const { name, lastName, gender, phone } = request.body;

    const user = await UserServices.updateUser(id, {
      name,
      lastName,
      gender,
      phone,
    });

    return response.status(user.status).json(user.data);
  }

  async statusUpdate(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const user = await UserServices.statusUpdate(id, status);

    return response.status(user.status).json(user.data);
  }

  async passwordUpdate(request, response) {
    const { id } = request.params;
    const { password } = request.body;

    const user = await UserServices.passwordUpdate(id, password);

    return response.status(user.status).json(user.data);
  }
}

module.exports = new UserController();
