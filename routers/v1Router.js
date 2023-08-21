const v1Router = require("express").Router();
const getUsersRouter = require("./usersRouter");
const getPostsRouter = require("./postsRouter");
const getFeaturesRouter = require("./featuresRouter");

const getV1Router = () => {
    v1Router.use("/users", getUsersRouter());
    v1Router.use("/posts", getPostsRouter());
    v1Router.use("/features", getFeaturesRouter());
    return v1Router;
}

module.exports = getV1Router;
