const postsRouter = require("express").Router();
const { postsController } = require('../controllers/postsController');

const getPostsRouter = () => {
    postsRouter.post("/:userId", postsController.addPost);
    postsRouter.get("/", postsController.getAllPosts);
    postsRouter.get("/:id", postsController.getUserPosts);

    return postsRouter;
}

module.exports = getPostsRouter;
