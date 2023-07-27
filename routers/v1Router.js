const v1Router = require("express").Router();

const chefsRouter = require("./chefsRouter").chefsRouter;
const restaurantsRouter = require("./restaurantsRouter").restaurantsRouter;
const dishesRouter = require("./dishesRouter").dishesRouter;

v1Router.use("/chefs", chefsRouter);
v1Router.use("/restaurants", restaurantsRouter);
v1Router.use("/dishes", dishesRouter);

module.exports = { v1Router };