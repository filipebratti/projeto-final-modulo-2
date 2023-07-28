const {
  createMedicine,
  medicineUpdate,
  medicineList,
  medicineIdList,
  medicineDelete,
} = require("../controllers/medicine.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class MedicineRouter {
  routesFromMedicine() {
    const medicineRoutes = Router();
    medicineRoutes.post("/medicamentos", auth, createMedicine);
    medicineRoutes.put("/medicamentos/:id", auth, medicineUpdate);
    medicineRoutes.get("/medicamentos/:id", auth, medicineIdList);
    medicineRoutes.get("/medicamentos/:tipo?", auth, medicineList);
    medicineRoutes.delete("/medicamentos/:id", auth, medicineDelete);

    return medicineRoutes;
  }
}

module.exports = new MedicineRouter();
