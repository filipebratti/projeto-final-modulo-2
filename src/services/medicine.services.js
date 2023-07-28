const { Medicine } = require("../models/medicine");

const MedicineServices = {
  async medicineList(tipo) {
    if (tipo !== "true" && tipo !== "false" && tipo !== undefined)
      return { data: "Tipo inválido", status: 400 };

    let medicine = undefined;

    if (tipo === "true" || tipo === "false") {
      medicine = await Medicine.findAll({ where: { type: tipo } });
    } else {
      medicine = await Medicine.findAll();
    }

    if (!medicine) {
      return { data: "Nenhum Medicamento encontrado.", status: 404 };
    }

    return { data: medicine, status: 200 };
  },

  async medicineIdList(id) {
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
      return {
        data: "Nenhum medicamento encontrado com esse identificador.",
        status: 404,
      };
    }

    return { data: medicine, status: 200 };
  },

  async createMedicine(medicine) {
    if (!medicine.userId)
      return { data: "Identificador do usuário é obrigatório", status: 400 };
    if (!medicine.depositId)
      return { data: "Identificador do depósito é obrigatório", status: 400 };
    if (!medicine.name)
      return { data: "Nome do Medicamento é obrigatório", status: 400 };
    if (!medicine.laboratory)
      return { data: "Nome do Laboratório é obrigatório", status: 400 };
    if (!medicine.dosage) return { data: "Dosagem é obrigatório", status: 400 };
    if (!medicine.dosageUnit)
      return { data: "Unidade da Dosagem é obrigatório", status: 400 };
    //if (!medicine.type) return { data: "Tipo é obrigatório", status: 400 };
    if (medicine.type === undefined)
      return { data: "Status é obrigatório", status: 400 };
    if (typeof medicine.type !== "boolean")
      return { data: "Tipo deve ser booleano", status: 400 };
    if (!medicine.unitPrice)
      return { data: "Preço é obrigatório", status: 400 };
    if (!medicine.quantity)
      return { data: "Quantidade é obrigatório", status: 400 };

    const medicamentoExistente = await Medicine.findOne({
      where: { name: medicine.name },
    });

    if (medicamentoExistente) {
      return { data: "Medicamento já cadastrado.", status: 409 };
    }

    const data = await Medicine.create(medicine);

    return { data, status: 201 };
  },

  async medicineUpdate(id, medicine) {
    const medicamentoExistente = await Medicine.findByPk(id);

    if (!medicamentoExistente) {
      return { data: "Medicamento não cadastrado.", status: 404 };
    }
    if (!medicine.description)
      return { data: "Descrição é obrigatória", status: 400 };
    if (!medicine.unitPrice)
      return { data: "Preço Unitário é obrigatório", status: 400 };
    if (!medicine.quantity)
      return { data: "Quantidade é obrigatório", status: 400 };

    const data = await Medicine.update(medicine, { where: { id } });

    return { data, status: 200 };
  },

  async medicineDelete(id) {
    const medicamentoExistente = await Medicine.findByPk(id);

    if (!medicamentoExistente) {
      return { data: "Medicamento não cadastrado.", status: 404 };
    }

    const data = await Medicine.destroy({ where: { id } });

    return { data, status: 200 };
  },
};

module.exports = MedicineServices;
