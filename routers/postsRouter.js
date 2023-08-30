const postsRouter = require("express").Router();
const { postsController } = require('../controllers/postsController');

const getPostsRouter = () => {
    postsRouter.post("/:userId", postsController.addPost);

    postsRouter.get("/getUserHomePosts/:userId", postsController.getUserHomepagePosts);
    postsRouter.get("/:userId", postsController.getUserPosts);
    postsRouter.get("/", postsController.getAllPosts);

    postsRouter.put("/like/:postId/:userId", postsController.addLikeToPost);
    postsRouter.put("/edit/:postId", postsController.updateContentPost);

    return postsRouter;
}

module.exports = getPostsRouter;
