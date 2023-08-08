const usersRouter = require("express").Router();
const usersController = require("../controllers/usersController");

module.exports = { usersRouter };

usersRouter.post("/", (req, res) => {usersController.addUser});
usersRouter.get("/", (req, res) => {usersController.getAllUsers});