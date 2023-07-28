const { User } = require("../models/user");
const { sign } = require("jsonwebtoken");

const UserServices = {
  async getUser(id) {
    const user = await User.findByPk(id);

    if (!user) {
      return { data: "Usuário não encontrado.", status: 404 };
    }

    return { data: user, status: 200 };
  },

  async createUser(user) {
    if (!user.name) return { data: "Nome é obrigatório", status: 400 };
    if (!user.lastName) return { data: "Sobrenome é obrigatório", status: 400 };
    if (!user.cpf) return { data: "CPF é obrigatório", status: 400 };
    if (!user.email) return { data: "E-mail é obrigatório", status: 400 };
    if (!user.password) return { data: "Senha é obrigatório", status: 400 };
    if (!user.status) return { data: "Status é obrigatório", status: 400 };

    const validateCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!validateCPF.test(user.cpf)) {
      return {
        data: "CPF deve estar formatado seguindo o padrão 000.000.000-00",
        status: 400,
      };
    }

    if (!user.password.length > 8) {
      return { data: "Senha deve ter no mínimo 8 caracteres", status: 400 };
    }

    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validateEmail.test(user.email)) {
      return { data: "Email inválido", status: 400 };
    }

    const emailExistente = await User.findOne({
      where: { email: user.email },
    });

    if (emailExistente) {
      return { data: "Email já existe", status: 409 };
    }

    const validatePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

    if (!validatePassword.test(user.password)) {
      return {
        data: "Senha deve conter ao menos uma letra maiúscula, um número e um caractere especial",
        status: 400,
      };
    }

    const usuarioExistente = await User.findOne({ where: { cpf: user.cpf } });

    if (usuarioExistente) {
      return { data: "CPF já cadastrado.", status: 409 };
    }

    const data = await User.create(user);

    return { data, status: 201 };
  },

  async loginUser(user) {
    if (!user.email) return { data: "E-mail é obrigatório", status: 400 };
    if (!user.password) return { data: "Senha é obrigatório", status: 400 };

    const usuarioExistente = await User.findOne({
      where: { email: user.email },
    });

    if (!usuarioExistente) {
      return { data: "Usuário não cadastrado.", status: 404 };
    }

    if (usuarioExistente.password !== user.password) {
      return { data: "Senha inválida.", status: 400 };
    }

    const payload = {
      email: user.email,
      password: user.password,
    };
    const token = sign(payload, process.env.SECRET_JWT);

    return { data: token, status: 200 };
  },

  async updateUser(id, user) {
    const usuarioExistente = await User.findByPk(id);

    if (!usuarioExistente) {
      return { data: "Usuário não cadastrado.", status: 404 };
    }
    if (!user.name) return { data: "Nome é obrigatório", status: 400 };
    if (!user.lastName) return { data: "Sobrenome é obrigatório", status: 400 };
    if (!user.gender) return { data: "Gênero é obrigatório", status: 400 };
    if (!user.phone) return { data: "Telefone é obrigatório", status: 400 };

    const data = await User.update(user, { where: { id } });

    return { data, status: 200 };
  },

  async statusUpdate(id, status) {
    const usuarioExistente = await User.findByPk(id);

    if (!usuarioExistente) {
      return { data: "Usuário não cadastrado.", status: 404 };
    }
    if (status === undefined)
      return { data: "Status é obrigatório", status: 400 }; // alterei para undefined para que o status possa ser alterado para false
    if (typeof status !== "boolean") {
      return { data: "Status deve ser booleano", status: 400 };
    }

    const data = await User.update({ status }, { where: { id } }); // englobei status dentro de um objeto para que o update funcione

    return { data, status: 200 };
  },

  async passwordUpdate(id, password) {
    const usuarioExistente = await User.findByPk(id);

    if (!usuarioExistente) {
      return { data: "Usuário não cadastrado.", status: 404 };
    }
    if (!password) return { data: "Senha é obrigatório", status: 400 };
    if (!password.length > 8) {
      return { data: "Senha deve ter no mínimo 8 caracteres", status: 400 };
    }

    const validatePassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

    if (!validatePassword.test(password)) {
      return {
        data: "Senha deve conter ao menos uma letra maiúscula, um número e um caractere especial",
        status: 400,
      };
    }

    const data = await User.update({ password }, { where: { id } });

    return { data, status: 200 };
  },
};

module.exports = UserServices;
