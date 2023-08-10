const postsRouter = require("express").Router();
const { postsController } = require('../controllers/postsController');

const getPostsRouter = () => {
    postsRouter.post("/", postsController.addPost);
    postsRouter.get("/", postsController.getAllPosts);
    return postsRouter;  // Return the router
}

module.exports = getPostsRouter;
