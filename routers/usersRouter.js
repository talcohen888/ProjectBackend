const usersRouter = require("express").Router();
const usersController = require("../controllers/usersController");

module.exports = { usersRouter };

usersRouter.post("/", (req, res) => {usersController.requestAddUser});
usersRouter.get("/", (req, res) => {usersController.requestGetUser});