const {
  createDeposit,
  depositUpdate,
  depositStatusUpdate,
  depositList,
  depositIdList,
  depositDelete,
} = require("../controllers/deposit.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class DepositRouter {
  routesFromDeposit() {
    const depositRoutes = Router();
    depositRoutes.post("/depositos", auth, createDeposit);
    depositRoutes.patch("/depositos/:id", auth, depositUpdate);
    depositRoutes.patch("/depositos/:id/status", depositStatusUpdate);
    depositRoutes.get("/depositos/:id", auth, depositIdList);
    depositRoutes.get("/depositos/:status?", auth, depositList);
    depositRoutes.delete("/depositos/:id", auth, depositDelete);

    return depositRoutes;
  }
}

module.exports = new DepositRouter();
