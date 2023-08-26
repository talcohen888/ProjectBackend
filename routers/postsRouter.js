const postsRouter = require("express").Router();
const { postsController } = require('../controllers/postsController');

const getPostsRouter = () => {
    postsRouter.post("/:userId", postsController.addPost);
    postsRouter.get("/getHomePosts/:id", postsController.getUserHomePosts);
    postsRouter.get("/:id", postsController.getUserPosts);
    postsRouter.get("/", postsController.getAllPosts);

    return postsRouter;
}

module.exports = getPostsRouter;
