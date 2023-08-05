const v1Router = require("express").Router();

const usersRouter = require("./usersRouter").usersRouter;
const postsRouter = require("./postsRouter").postsRouter;

v1Router.use("/users", usersRouter);
v1Router.use("/posts", postsRouter);

module.exports = { v1Router };