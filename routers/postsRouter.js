const postsRouter = require("express").Router();
const postsController = require("../controllers/postsController");

module.exports = { postsRouter };

postsRouter.post("/", (req, res) => {postsController.addPost});
postsRouter.get("/", (req, res) => {postsController.getAllPosts});