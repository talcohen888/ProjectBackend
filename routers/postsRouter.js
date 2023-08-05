const postsRouter = require("express").Router();
const postsController = require("../controllers/postsController");

module.exports = { postsRouter };

postsRouter.post("/", (req, res) => {postsController.requestAddPost});
postsRouter.put("/", (req, res) => {postsController.requestUpdatePost});
postsRouter.get("/", (req, res) => {postsController.requestGetPost});