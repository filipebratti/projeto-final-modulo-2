const { createOneUser, loginUser, updateUser, statusUpdate, passwordUpdate, getUser } = require("../controllers/user.controller"); 
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class UserRouter {
  routesFromUser() {
    const userRoutes = Router();
    userRoutes.post("/usuarios", createOneUser);
    userRoutes.post("/usuarios/login", loginUser);
    userRoutes.patch("/usuarios/:id", auth, updateUser);
    userRoutes.patch("/usuarios/:id/status", auth, statusUpdate);
    userRoutes.patch("/usuarios/:id/senha", auth, passwordUpdate);
    userRoutes.get("/usuarios/:id", auth, getUser);
    return userRoutes;
  }
}

module.exports = new UserRouter();
