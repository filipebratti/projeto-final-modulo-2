const MedicineServices = require("../services/medicine.services");
const { config } = require("dotenv");
config();

class MedicineController {
  async medicineList(request, response) {
    const { tipo } = request.query;

    const medicine = await MedicineServices.medicineList(tipo);

    return response.status(medicine.status).json(medicine.data);
  }

  async medicineIdList(request, response) {
    const { id } = request.params;

    const medicine = await MedicineServices.medicineIdList(id);

    return response.status(medicine.status).json(medicine.data);
  }

  async createMedicine(request, response) {
    const {
      userId,
      depositId,
      name,
      laboratory,
      description,
      dosage,
      dosageUnit,
      type,
      unitPrice,
      quantity,
    } = request.body;

    const medicine = await MedicineServices.createMedicine({
      userId,
      depositId,
      name,
      laboratory,
      description,
      dosage,
      dosageUnit,
      type,
      unitPrice,
      quantity,
    });

    return response.status(medicine.status).json(medicine.data);
  }

  async medicineUpdate(request, response) {
    const { id } = request.params;
    const { description, unitPrice, quantity } = request.body;

    const medicine = await MedicineServices.medicineUpdate(id, {
      description,
      unitPrice,
      quantity,
    });

    return response.status(medicine.status).json(medicine.data);
  }

  async medicineDelete(request, response) {
    const { id } = request.params;

    const medicine = await MedicineServices.medicineDelete(id);

    return response.status(medicine.status).json(medicine.data);
  }
}

module.exports = new MedicineController();
