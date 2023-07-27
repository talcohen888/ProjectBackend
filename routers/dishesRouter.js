const dishesRouter = require("express").Router();
const dishesController = require("../controllers/dishesController");

module.exports = { dishesRouter };

dishesRouter.post("/", (req, res) => {dishesController.requestAddDish});