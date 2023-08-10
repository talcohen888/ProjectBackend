const v1Router = require("express").Router();
const getUsersRouter = require("./usersRouter");
const getPostsRouter = require("./postsRouter");

const getV1Router = () => {
    v1Router.use("/users", getUsersRouter());
    v1Router.use("/posts", getPostsRouter());
    return v1Router;
}

module.exports = getV1Router;
